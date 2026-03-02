-- YSC Scheduling System Database Schema
-- Add to your existing Supabase database

-- ===================================
-- TELEGRAM USERS
-- ===================================
CREATE TABLE telegram_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  telegram_id BIGINT UNIQUE NOT NULL, -- Telegram user ID
  telegram_username VARCHAR(255),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ===================================
-- MESSENGER USERS (for Facebook Messenger)
-- ===================================
CREATE TABLE messenger_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  messenger_id VARCHAR(255) UNIQUE NOT NULL, -- FB Messenger PSID
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ===================================
-- SCHEDULES
-- ===================================
CREATE TABLE schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  instructor_id UUID REFERENCES instructors(id),
  program_id UUID REFERENCES programs(id),
  
  -- Schedule details
  title VARCHAR(255) NOT NULL,
  description TEXT,
  class_type VARCHAR(50) DEFAULT 'onsite', -- 'onsite' or 'online'
  location TEXT, -- Physical address or Zoom link
  
  -- Timing
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  timezone VARCHAR(50) DEFAULT 'Asia/Manila',
  
  -- Recurrence
  is_recurring BOOLEAN DEFAULT false,
  recurrence_pattern VARCHAR(50), -- 'daily', 'weekly', 'biweekly', 'monthly'
  recurrence_end_date DATE,
  
  -- Status
  status VARCHAR(50) DEFAULT 'scheduled', -- 'scheduled', 'completed', 'cancelled', 'rescheduled'
  
  -- Metadata
  created_by UUID, -- admin user who created
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ===================================
-- SCHEDULED MESSAGES (Reminders)
-- ===================================
CREATE TABLE scheduled_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  schedule_id UUID REFERENCES schedules(id) ON DELETE CASCADE,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  
  -- Message details
  message_type VARCHAR(50) NOT NULL, -- 'telegram', 'messenger', 'email', 'sms'
  message_template VARCHAR(50), -- 'class_reminder', 'cancellation', 'custom'
  message_content TEXT NOT NULL,
  
  -- Timing
  send_at TIMESTAMP NOT NULL, -- When to send
  reminder_offset_minutes INTEGER, -- How many minutes before class (e.g., 60 = 1hr before)
  
  -- Status
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'sent', 'failed', 'cancelled'
  sent_at TIMESTAMP,
  error_message TEXT,
  
  -- Delivery info
  telegram_message_id BIGINT, -- If sent via Telegram
  messenger_message_id VARCHAR(255), -- If sent via Messenger
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ===================================
-- MESSAGE TEMPLATES
-- ===================================
CREATE TABLE message_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  category VARCHAR(50), -- 'reminder', 'cancellation', 'welcome', 'custom'
  template TEXT NOT NULL, -- Template with placeholders: {{student_name}}, {{class_time}}, etc.
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert default templates
INSERT INTO message_templates (name, category, template) VALUES
('class_reminder_1hr', 'reminder', 
  'Hi {{student_name}}! 👋
  
Reminder: You have a {{class_type}} {{program_name}} class in 1 hour.

📅 Date: {{date}}
⏰ Time: {{time}}
📍 Location: {{location}}
👨‍🏫 Instructor: {{instructor_name}}

See you soon! 🎵'),

('class_reminder_24hr', 'reminder',
  'Hello {{student_name}}! 
  
This is a reminder for your {{program_name}} class tomorrow.

📅 {{date}}
⏰ {{time}}
📍 {{location}}

Please confirm your attendance by replying "Yes" or let us know if you need to reschedule.'),

('class_cancellation', 'cancellation',
  'Hi {{student_name}},

We regret to inform you that your {{program_name}} class scheduled for {{date}} at {{time}} has been cancelled.

Reason: {{reason}}

Please contact us to reschedule. We apologize for any inconvenience.'),

('welcome_student', 'welcome',
  'Welcome to Young Starter Club, {{student_name}}! 🎉

We''re excited to have you in our {{program_name}} program.

Your instructor {{instructor_name}} will be in touch soon to schedule your first class.

You''ll receive automatic reminders before each class. Stay tuned!');

-- ===================================
-- INDEXES for performance
-- ===================================
CREATE INDEX idx_telegram_users_student ON telegram_users(student_id);
CREATE INDEX idx_telegram_users_telegram_id ON telegram_users(telegram_id);
CREATE INDEX idx_messenger_users_student ON messenger_users(student_id);
CREATE INDEX idx_schedules_student ON schedules(student_id);
CREATE INDEX idx_schedules_date ON schedules(scheduled_date);
CREATE INDEX idx_schedules_status ON schedules(status);
CREATE INDEX idx_scheduled_messages_send_at ON scheduled_messages(send_at);
CREATE INDEX idx_scheduled_messages_status ON scheduled_messages(status);
CREATE INDEX idx_scheduled_messages_schedule ON scheduled_messages(schedule_id);

-- ===================================
-- FUNCTIONS for automatic reminders
-- ===================================

-- Function to create automatic reminders when schedule is created
CREATE OR REPLACE FUNCTION create_automatic_reminders()
RETURNS TRIGGER AS $$
DECLARE
  telegram_exists BOOLEAN;
  messenger_exists BOOLEAN;
  class_datetime TIMESTAMP;
  reminder_1hr TIMESTAMP;
  reminder_24hr TIMESTAMP;
BEGIN
  -- Check if student has Telegram
  SELECT EXISTS(
    SELECT 1 FROM telegram_users 
    WHERE student_id = NEW.student_id AND is_active = true
  ) INTO telegram_exists;
  
  -- Check if student has Messenger
  SELECT EXISTS(
    SELECT 1 FROM messenger_users 
    WHERE student_id = NEW.student_id AND is_active = true
  ) INTO messenger_exists;
  
  -- Calculate datetime
  class_datetime := NEW.scheduled_date + NEW.scheduled_time;
  reminder_1hr := class_datetime - INTERVAL '1 hour';
  reminder_24hr := class_datetime - INTERVAL '24 hours';
  
  -- Create 1-hour reminder (Telegram preferred)
  IF telegram_exists THEN
    INSERT INTO scheduled_messages (schedule_id, student_id, message_type, message_template, message_content, send_at, reminder_offset_minutes)
    VALUES (
      NEW.id, 
      NEW.student_id, 
      'telegram', 
      'class_reminder_1hr',
      '', -- Will be populated from template
      reminder_1hr,
      60
    );
  ELSIF messenger_exists THEN
    INSERT INTO scheduled_messages (schedule_id, student_id, message_type, message_template, message_content, send_at, reminder_offset_minutes)
    VALUES (
      NEW.id, 
      NEW.student_id, 
      'messenger', 
      'class_reminder_1hr',
      '',
      reminder_1hr,
      60
    );
  END IF;
  
  -- Create 24-hour reminder
  IF telegram_exists THEN
    INSERT INTO scheduled_messages (schedule_id, student_id, message_type, message_template, message_content, send_at, reminder_offset_minutes)
    VALUES (
      NEW.id, 
      NEW.student_id, 
      'telegram', 
      'class_reminder_24hr',
      '',
      reminder_24hr,
      1440
    );
  ELSIF messenger_exists THEN
    INSERT INTO scheduled_messages (schedule_id, student_id, message_type, message_template, message_content, send_at, reminder_offset_minutes)
    VALUES (
      NEW.id, 
      NEW.student_id, 
      'messenger', 
      'class_reminder_24hr',
      '',
      reminder_24hr,
      1440
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-create reminders
CREATE TRIGGER trigger_create_reminders
AFTER INSERT ON schedules
FOR EACH ROW
WHEN (NEW.status = 'scheduled')
EXECUTE FUNCTION create_automatic_reminders();

-- ===================================
-- VIEW for upcoming classes
-- ===================================
CREATE VIEW upcoming_classes AS
SELECT 
  s.*,
  st.first_name || ' ' || st.last_name as student_name,
  st.email as student_email,
  i.name as instructor_name,
  p.name as program_name,
  tu.telegram_id,
  mu.messenger_id,
  (s.scheduled_date + s.scheduled_time) as class_datetime
FROM schedules s
LEFT JOIN students st ON s.student_id = st.id
LEFT JOIN instructors i ON s.instructor_id = i.id
LEFT JOIN programs p ON s.program_id = p.id
LEFT JOIN telegram_users tu ON s.student_id = tu.student_id AND tu.is_active = true
LEFT JOIN messenger_users mu ON s.student_id = mu.student_id AND mu.is_active = true
WHERE s.status = 'scheduled'
  AND s.scheduled_date >= CURRENT_DATE
ORDER BY s.scheduled_date, s.scheduled_time;
