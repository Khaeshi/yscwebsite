import { useState } from "react";
import { Card } from "./ui/card.tsx";
import { Button } from "./ui/button.tsx";
import { Input } from "./ui/input.tsx";
import { Textarea } from "./ui/textarea.tsx";
import { Badge } from "./ui/badge.tsx";
import { Calendar, MapPin, Clock, Plus, Edit2 } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: "upcoming" | "ongoing" | "past";
}

export function EventBanner() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "",
      description: "Join us for an evening of beautiful performances by our talented music students!",
      date: "2024-12-15",
      time: "6:00 PM",
      location: "Young Starter Club Main Hall",
      type: "upcoming",
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      setEvents(events.map(event => 
        event.id === editingId 
          ? { ...event, ...formData, type: "upcoming" as const }
          : event
      ));
      setEditingId(null);
    } else {
      const newEvent: Event = {
        id: Date.now().toString(),
        ...formData,
        type: "upcoming" as const
      };
      setEvents([...events, newEvent]);
    }
    
    setFormData({ title: "", description: "", date: "", time: "", location: "", });
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ title: "", description: "", date: "", time: "", location: "", });
  };

  const upcomingEvents = events.filter(e => e.type === "upcoming");

  if (upcomingEvents.length === 0 && !showForm) {
    return null;
  }

  return (
    <div className="mb-8">
      {upcomingEvents.length > 0 && (
        <div className="space-y-4 mb-4">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <Badge className="bg-purple-600 hover:bg-purple-700 mb-2">Upcoming Event</Badge>
                      <h3 className="mb-1">{event.title}</h3>
                    </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4">{event.description}</p>
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-purple-600" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <Button asChild>
                  <a href="/Events/event-guidelines" className="mt-6" rel="noopener noreferrer">
                    Learn More
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {showForm && (
        <Card className="p-6 border-2 border-purple-200">
          <h3 className="mb-4">{editingId ? "Edit Event" : "Create New Event"}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2">Event Title</label>
              <Input
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Annual Music Recital 2024"
              />
            </div>
            
            <div>
              <label className="block mb-2">Description</label>
              <Textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the event..."
                rows={3}
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Date</label>
                <Input
                  required
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div>
                <label className="block mb-2">Time</label>
                <Input
                  required
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
            </div>
            
            <div>
              <label className="block mb-2">Location</label>
              <Input
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Young Starter Club Main Hall"
              />
            </div>

            
            <div className="flex gap-3 pt-2">
              <Button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                {editingId ? "Update Event" : "Create Event"}
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}