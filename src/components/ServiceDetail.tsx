import { ImageWithFallback } from "./figma/ImageWithFallback.tsx";
import { Button } from "./ui/button.tsx";
import { Badge } from "./ui/badge.tsx";
import { CheckCircle2 } from "lucide-react";
import React from "react";

interface ServiceDetailProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  color: string;
  age: string;
  duration: string;
  features: string[];
  curriculum: {
    title: string;
    items: string[];
  };
  materials?: string;
  reverse?: boolean;
}

export function ServiceDetail({
  id,
  title,
  subtitle,
  description,
  image,
  color,
  age,
  duration,
  features,
  curriculum,
  materials,
  reverse = false,
}: ServiceDetailProps) {
  return (
    <section id={id} className="py-20 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
          {/* Image Section */}
          <div className={`relative ${reverse ? 'lg:order-2' : ''}`}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={image}
                alt={title}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex gap-3 flex-wrap">
                  <Badge className={`${color} text-white border-0`}>
                    {age}
                  </Badge>
                  <Badge className={`${color} text-white border-0`}>
                    {duration}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className={reverse ? 'lg:order-1' : ''}>
            <div className="mb-4">
              <span className="text-purple-600">{subtitle}</span>
            </div>
            <h2 className="mb-6">{title}</h2>
            <p className="text-muted-foreground mb-6">{description}</p>

            {/* What You'll Learn */}
            <div className="mb-6">
              <h4 className="mb-4">What You'll Experience:</h4>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Curriculum Overview */}
            <div className="mb-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
              <h4 className="mb-3">{curriculum.title}</h4>
              <ul className="space-y-2">
                {curriculum.items.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-600"></div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Materials */}
            {materials && (
              <div className="mb-6">
                <h4 className="mb-2">Materials:</h4>
                <p className="text-muted-foreground">{materials}</p>
              </div>
            )}

            {/* CTA */}
            <Button 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={() => window.open('https://facebook.com', '_blank')}
            >
              Inquire About This Program
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
