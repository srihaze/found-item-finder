import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Phone, Mail } from "lucide-react";
import { useState } from "react";

interface Item {
  id: string;
  type: string;
  name: string;
  description: string;
  contact: string;
  place: string;
  date: string;
  imageUrl?: string;
  timestamp: string;
}

interface ItemCardProps {
  item: Item;
}

export const ItemCard = ({ item }: ItemCardProps) => {
  const [showContact, setShowContact] = useState(false);
  
  const formatDate = (dateString: string) => {
    if (!dateString) return "Date not specified";
    return new Date(dateString).toLocaleDateString();
  };

  const getTimeSince = (timestamp: string) => {
    const now = new Date();
    const posted = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just posted";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <Card className="overflow-hidden hover:shadow-card transition-all duration-200 bg-gradient-card">
      <div className="aspect-video bg-muted relative overflow-hidden">
        {item.imageUrl ? (
          <img 
            src={item.imageUrl} 
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-muted to-muted/50">
            <div className="text-center">
              <div className="text-4xl mb-2">📦</div>
              <p className="text-sm text-muted-foreground">No image</p>
            </div>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <Badge 
            variant={item.type === 'lost' ? 'destructive' : 'secondary'}
            className="font-semibold"
          >
            {item.type === 'lost' ? '🔍 Lost' : '✨ Found'}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
            {getTimeSince(item.timestamp)}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-card-foreground truncate">
            {item.name}
          </h3>
          
          <p className="text-muted-foreground text-sm line-clamp-2">
            {item.description}
          </p>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{item.place}</span>
            </div>
            {item.date && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(item.date)}</span>
              </div>
            )}
          </div>
          
          <div className="pt-2 border-t">
            {!showContact ? (
              <Button 
                variant="campus" 
                size="sm" 
                onClick={() => setShowContact(true)}
                className="w-full"
              >
                Show Contact Info
              </Button>
            ) : (
              <div className="flex items-center gap-2 text-sm">
                {item.contact.includes('@') ? (
                  <Mail className="h-4 w-4 text-primary" />
                ) : (
                  <Phone className="h-4 w-4 text-primary" />
                )}
                <span className="font-medium text-primary">{item.contact}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};