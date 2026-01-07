import { Facebook, Mail, Phone, MapPin, InstagramIcon } from "lucide-react";
import logoImg  from "../assets/YSC.png";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 text-white">
      <div className="container mx-auto px-4 sm:px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="mb-4">
              <a href="/">
                <img 
                  src={logoImg.src} 
                  alt="Young Starter Club" 
                  className="h-16 w-auto cursor-pointer hover:scale-105 transition-transform"
                  style={{
                    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3)) brightness(1.1)',
                  }}
                />
              </a>
            </div>
            <p className="text-white/80">
              Empowering children and adults to discover their creative talents through
               quality lessons in music, sports, arts, and more.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/#programs" className="text-white/80 hover:text-white transition-transform transition-colors inline-block duration-300 hover:translate-x-1">
                  Our Programs
                </a>
              </li>
              <li>
                <a href="/#testimonials" className="text-white/80 hover:text-white transition-transform transition-colors inline-block duration-300 hover:translate-x-1">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="/#location" className="text-white/80 hover:text-white transition-transform transition-colors inline-block duration-300 hover:translate-x-1">
                  Location
                </a>
              </li>
              <li>
                <a href="/aboutpage" className="text-white/80 hover:text-white transition-transform transition-colors inline-block duration-300 hover:translate-x-1">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="mb-4">Our Programs</h4>
            <ul className="space-y-2">
              <li>
                <a href="/music-teaching" className="text-white/80 hover:text-white transition-transform transition-colors inline-block duration-300 hover:translate-x-1">
                  Music Teaching
                </a>
              </li>
              <li>
                <a href="/badminton-coaching" className="text-white/80 hover:text-white transition-transform transition-colors inline-block duration-300 hover:translate-x-1">
                  Badminton Coaching
                </a>
              </li>
              <li>
                <a href="/arts-lesson" className="text-white/80 hover:text-white transition-transform transition-colors inline-block duration-300 hover:translate-x-1">
                  Arts Lessons
                </a>
              </li>
              <li>
                <a href="/cooking-session" className="text-white/80 hover:text-white transition-transform transition-colors inline-block duration-300 hover:translate-x-1">
                  Cooking Sessions
                </a>
              </li>
              <li>
                <a href="/photography-classes" className="text-white/80 hover:text-white transition-transform transition-colors inline-block duration-300 hover:translate-x-1">
                  Photography Classes
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-medium">Get in Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/80">
                <Phone className="w-4 h-4" />
                <span>(+63) 949-077-5573</span>
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <Mail className="w-4 h-4" />
                <span>youngstarterclub@gmail.com</span>
              </li>
              <li className="flex items-start gap-2 text-white/80">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>#38 Goldfinch Street Phase 1 <br /> Brgy. San Vicente Pacita  <br /> San Pedro Laguna, San Pedro, Philippines</span>
              </li>
            </ul>
            {/* Social */}
              <div className="pt-6">
                <h3 className="text-white mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <motion.a
                    href="https://www.facebook.com/YSCcommunity"
                    className="hover:text-red-400 transition-colors"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Facebook className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="https://www.instagram.com/youngstarterclub/"
                    className="hover:text-red-400 transition-colors"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <InstagramIcon className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 p-6 text-center text-white/60">
          <p>&copy; 2025 Young Starter Club. All rights reserved.</p>
        </div>
    </footer>
  );
}

