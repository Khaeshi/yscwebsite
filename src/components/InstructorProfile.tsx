import { Card } from "../components/ui/card.tsx";
import { Badge } from "./ui/badge.tsx";
import { ImageWithFallback } from "./figma/ImageWithFallback.tsx";
import { Award, Target } from "lucide-react";
import React from "react";

interface InstructorProfileProps {
  name: string;
  title: string;
  image: string;
  specialization: string[];
  experience: string;
  description: string;
  achievements?: string[];
  key: number;
}

export function InstructorProfile({ 
  name, 
  title, 
  image, 
  specialization, 
  experience, 
  description,
  achievements 
}: InstructorProfileProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="grid md:grid-cols-5 gap-6 p-6">
        <div className="md:col-span-2">
          <div className="aspect-square rounded-xl overflow-hidden mb-4">
            <ImageWithFallback
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Award className="w-4 h-4 text-purple-600" />
              <span>{experience}</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-purple-600" />
                <span className="text-muted-foreground">Specializations:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {specialization.map((spec, index) => (
                  <Badge key={index} variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-3">
          <h3 className="mb-2">{name}</h3>
          <p className="text-purple-600 mb-4">{title}</p>
          
          <p className="text-muted-foreground mb-4 leading-relaxed">
            {description}
          </p>
          
          {achievements && achievements.length > 0 && (
            <div>
              <h4 className="mb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                Notable Achievements
              </h4>
              <ul className="space-y-2">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span className="text-muted-foreground">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
