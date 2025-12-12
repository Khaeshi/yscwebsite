import { ImageWithFallback } from "./figma/ImageWithFallback.tsx";
import React from "react";

interface ProgramHistorySectionProps {
  image: string;
  foundedYear: string;
  milestones: {
    year: string;
    title: string;
    description: string;
  }[];
  stats?: {
    icon: React.ElementType;
    value: string;
    label: string;
  }[];
}

export function ProgramHistorySection({ 
  image, 
  foundedYear, 
  milestones,
  stats 
}: ProgramHistorySectionProps) {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 md:p-12">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-block bg-white px-4 py-2 rounded-full mb-6 border border-purple-200">
            <span className="text-purple-600">Since {foundedYear}</span>
          </div>
          <h2 className="mb-6">Our Journey</h2>
          
          <div className="space-y-6 mb-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white">
                    {milestone.year}
                  </div>
                </div>
                <div className="pt-1">
                  <h4 className="mb-2">{milestone.title}</h4>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {stats && stats.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-4 text-center border border-purple-100">
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                  <div className="mb-1">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <ImageWithFallback
              src={image}
              alt="Program history"
              className="w-full h-auto"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}
