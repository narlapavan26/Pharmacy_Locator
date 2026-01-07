import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Pill, Clock, Navigation } from "lucide-react";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const features = [
    { icon: Pill, label: "10,000+ Medicines" },
    { icon: MapPin, label: "500+ Pharmacies" },
    { icon: Clock, label: "Real-time Stock" },
    { icon: Navigation, label: "GPS Navigation" },
  ];

  return (
    <section className="relative min-h-screen gradient-hero pt-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 pt-16 md:pt-24 pb-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
            <Pill className="w-4 h-4" />
            <span>Your Health, Our Priority</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight mb-6 animate-slide-up">
            Find Medicines &{" "}
            <span className="text-gradient-primary">Pharmacies</span>{" "}
            Near You
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Search for any medicine and discover nearby pharmacies with real-time availability, road distances, and turn-by-turn navigation.
          </p>

          {/* Search Box */}
          <form 
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-12 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for medicines (e.g., Paracetamol, Amoxicillin...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-base bg-card border-border shadow-card rounded-xl focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button type="submit" variant="hero" size="xl">
              <Search className="w-5 h-5" />
              Search
            </Button>
          </form>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-muted-foreground">
                <feature.icon className="w-5 h-5 text-primary" />
                <span className="font-medium">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cards Preview */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <PharmacyPreviewCard
            name="HealthCare Pharmacy"
            distance="0.8 km"
            status="Open"
            medicines={42}
            delay="0.4s"
          />
          <PharmacyPreviewCard
            name="MediPlus Store"
            distance="1.2 km"
            status="Open"
            medicines={38}
            delay="0.5s"
            featured
          />
          <PharmacyPreviewCard
            name="City Pharma"
            distance="2.1 km"
            status="Closes at 10 PM"
            medicines={55}
            delay="0.6s"
          />
        </div>
      </div>
    </section>
  );
};

interface PharmacyPreviewCardProps {
  name: string;
  distance: string;
  status: string;
  medicines: number;
  delay?: string;
  featured?: boolean;
}

const PharmacyPreviewCard = ({ name, distance, status, medicines, delay, featured }: PharmacyPreviewCardProps) => {
  return (
    <div 
      className={`relative bg-card rounded-2xl p-6 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-up ${featured ? 'ring-2 ring-primary md:scale-105' : ''}`}
      style={{ animationDelay: delay }}
    >
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 gradient-primary text-primary-foreground text-xs font-semibold rounded-full">
          Nearest
        </div>
      )}
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-light flex items-center justify-center">
          <MapPin className="w-6 h-6 text-primary" />
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-light text-primary text-sm font-medium">
          {status}
        </span>
      </div>
      <h3 className="font-display font-semibold text-lg text-foreground mb-2">{name}</h3>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Navigation className="w-4 h-4" />
          {distance}
        </span>
        <span className="flex items-center gap-1">
          <Pill className="w-4 h-4" />
          {medicines} medicines
        </span>
      </div>
    </div>
  );
};

export default HeroSection;
