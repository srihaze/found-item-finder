import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Upload, MapPin, Phone, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ItemFormProps {
  onSubmit: (item: any) => void;
}

export const ItemForm = ({ onSubmit }: ItemFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    description: "",
    contact: "",
    place: "",
    date: "",
    image: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.type || !formData.name || !formData.description || !formData.contact || !formData.place) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newItem = {
      ...formData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      imageUrl: formData.image ? URL.createObjectURL(formData.image) : null,
    };

    onSubmit(newItem);
    setFormData({
      type: "",
      name: "",
      description: "",
      contact: "",
      place: "",
      date: "",
      image: null,
    });

    toast({
      title: "Item Posted!",
      description: `Your ${formData.type} item has been posted successfully.`,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, image: file });
  };

  return (
    <Card className="shadow-form bg-gradient-card">
      <CardHeader>
        <CardTitle className="text-2xl bg-gradient-hero bg-clip-text text-transparent">
          Post an Item
        </CardTitle>
        <CardDescription>
          Help your fellow students by posting lost or found items
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Item Type *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lost">Lost Item</SelectItem>
                  <SelectItem value="found">Found Item</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Item Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="e.g., iPhone 13, Blue Backpack, Keys"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Provide details about the item (color, brand, distinguishing features, etc.)"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="min-h-20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact">Contact Information *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="contact"
                  placeholder="Email or phone number"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="place">Location *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="place"
                  placeholder="Where was it lost/found?"
                  value={formData.place}
                  onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Item Photo</Label>
            <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
              <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <div className="text-sm text-muted-foreground mb-2">
                Click to upload an image or drag and drop
              </div>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mx-auto max-w-xs"
              />
              {formData.image && (
                <p className="text-sm text-primary mt-2">
                  Selected: {formData.image.name}
                </p>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full" variant="submit" size="lg">
            Post Item
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};