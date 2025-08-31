import { useState } from "react";
import { ItemForm } from "@/components/ItemForm";
import { ItemGrid } from "@/components/ItemGrid";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import campusHero from "@/assets/campus-hero.jpg";
import { useItems } from "@/hooks/useItems";

const Index = () => {
  const { items, loading, addItem, markAsFound } = useItems();
  const [showForm, setShowForm] = useState(false);
  const [showResolved, setShowResolved] = useState(true);

  const handleAddItem = async (newItem: any) => {
    const result = await addItem(newItem);
    if (result.success) {
      setShowForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🎓</div>
              <div>
                <h1 className="text-xl font-bold">Campus Lost & Found</h1>
                <p className="text-sm text-muted-foreground">Help students reconnect with their items</p>
              </div>
            </div>
            <Button 
              variant="hero" 
              onClick={() => setShowForm(!showForm)}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Post Item
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={campusHero}
            alt="Campus scene"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero/80"></div>
        </div>
        <div className="relative container mx-auto px-4 py-16 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Lost Something? Found Something?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Connect with your campus community to reunite lost items with their owners
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg" 
              onClick={() => setShowForm(true)}
              className="gap-2"
            >
              <Plus className="h-5 w-5" />
              Post Lost Item
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="gap-2 border-white/20 bg-white/10 text-white hover:bg-white/20"
              onClick={() => {
                const element = document.getElementById('items-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Search className="h-5 w-5" />
              Browse Items
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Form Section */}
        {showForm && (
          <section className="max-w-2xl mx-auto">
            <ItemForm onSubmit={handleAddItem} />
          </section>
        )}

        {/* Items Section */}
        <section id="items-section">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Browse Items</h2>
            <Button
              variant="outline"
              onClick={() => setShowResolved(!showResolved)}
              className="gap-2"
            >
              {showResolved ? '👁️ Hide Resolved' : '👁️ Show Resolved'}
            </Button>
          </div>
          <ItemGrid 
            items={items}
            loading={loading}
            onMarkAsFound={markAsFound}
            showResolved={showResolved}
          />
        </section>

        {/* Stats Section */}
        <section className="bg-gradient-card rounded-2xl p-8 shadow-card">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold mb-2">Community Impact</h3>
            <p className="text-muted-foreground">Help make our campus a better place</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">{items.length}</div>
              <div className="text-sm text-muted-foreground">Total Items Posted</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-secondary">
                {items.filter(item => item.type === 'found').length}
              </div>
              <div className="text-sm text-muted-foreground">Items Found</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent">
                {items.filter(item => item.resolved).length}
              </div>
              <div className="text-sm text-muted-foreground">Items Resolved</div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/30 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>Campus Lost & Found Portal • Connecting Students • Building Community</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;