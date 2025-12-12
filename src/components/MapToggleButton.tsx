import { useState } from 'react';
  import { Button } from '../components/ui/button.tsx'; 
  import { MapPin } from 'lucide-react';
  
  export function MapToggleButton() {
    const [showMap, setShowMap] = useState(false);
  
    const toggleMap = () => {
      setShowMap(!showMap);
      const mapSection = document.getElementById('map-section');
      const mapContent = document.getElementById('map-content');
      if (mapSection && mapContent) {
        if (!showMap) {
          mapSection.classList.remove('max-h-0', 'opacity-0');
          mapSection.classList.add('max-h-[1000px]', 'opacity-100');
          setTimeout(() => {
            mapContent.classList.remove('-translate-y-8', 'opacity-0');
            mapContent.classList.add('translate-y-0', 'opacity-100');
          }, 100);
        } else {
          mapContent.classList.add('-translate-y-8', 'opacity-0');
          mapContent.classList.remove('translate-y-0', 'opacity-100');
          setTimeout(() => {
            mapSection.classList.add('max-h-0', 'opacity-0');
            mapSection.classList.remove('max-h-[1000px]', 'opacity-100');
          }, 700);
        }
      }
    };

    return (
        <Button 
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          onClick={toggleMap}
        >
          <MapPin className="w-5 h-5 mr-2" />
          {showMap ? 'Hide Map' : 'View on Map'}
        </Button>
      );
    }