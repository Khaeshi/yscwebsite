import { Card } from "./ui/card.tsx";
import { Badge } from "./ui/badge.tsx";
import { Button } from "./ui/button.tsx";
import { ImageWithFallback } from "./figma/ImageWithFallback.tsx";
import { ArrowRight } from "lucide-react";
import React from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  age: string;
  duration: string;
  color: string;
  id: string;
  hasDetailPage?: boolean;
}

export function ServiceCard({ title, description, image, age, duration, color, id, hasDetailPage }: ServiceCardProps) {
  const getLink = () => {
    if (id === "music") return "/music-teaching";
    if (id === "badminton") return "/badminton-coaching";
    return `#${id}`;
  };

  const handleClick = () => {
    if (!hasDetailPage) {
      window.location.href = `#${id}`;
    }
  };

  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-300">
      <div className="relative h-64 overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className={`absolute top-4 right-4 px-4 py-2 rounded-full ${color} text-white backdrop-blur-sm`}>
          {age}
        </div>
      </div>
      <div className="p-6">
        <h3 className="mb-3">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200">
            {duration}
          </Badge>
          {hasDetailPage ? (
            <a href={getLink()}>
              <Button 
                variant="ghost" 
                className="group/btn text-purple-600 hover:text-purple-700"
              >
                Learn More
                <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </a>
          ) : (
            <Button 
              variant="ghost" 
              className="group/btn text-purple-600 hover:text-purple-700"
              onClick={handleClick}
            >
              Learn More
              <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}