import React from "react";
import { Star, ThumbsUp } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  isRecommended: boolean;
  initials: string;
  color: string;
  date: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow h-full flex flex-col">
      {/* Avatar with initials and random color */}
      <div className="flex items-center mb-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${testimonial.color}`}>
          {testimonial.initials}
        </div>
        <div className="ml-4 flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 truncate">{testimonial.name}</h4>
          <p className="text-sm text-gray-500">{testimonial.role}</p>
          <p className="text-xs text-gray-400">{testimonial.date}</p>
        </div>
      </div>

      {/* Rating stars - Always show since we default recommendations to 5 stars */}
      <div className="flex mb-4">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
          />
        ))}
      </div>

      {/* Review content - Allow it to grow and push recommendation badge to bottom */}
      <p className="text-gray-700 text-sm leading-relaxed flex-grow mb-4">
        "{testimonial.content}"
      </p>

      {/* Recommendation badge at bottom */}
      {testimonial.isRecommended && (
        <div className="flex items-center text-green-600 pt-2 border-t border-gray-100">
          <ThumbsUp className="w-4 h-4 mr-1 fill-current" />
          <span className="text-sm font-medium">Recommends Young Starter Club</span>
        </div>
      )}
    </div>
  );
};