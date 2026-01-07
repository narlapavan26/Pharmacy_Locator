import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Navigation, Pill, Clock, Phone, Star, Filter } from "lucide-react";

const mockPharmacies = [
  {
    id: 1,
    name: "HealthCare Pharmacy",
    address: "123 Main Street, Medical District",
    distance: 0.8,
    rating: 4.8,
    reviews: 245,
    phone: "+1 555-0123",
    hours: "8:00 AM - 10:00 PM",
    isOpen: true,
    medicineCount: 420,
    image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "MediPlus Store",
    address: "456 Health Avenue, City Center",
    distance: 1.2,
    rating: 4.6,
    reviews: 189,
    phone: "+1 555-0456",
    hours: "9:00 AM - 9:00 PM",
    isOpen: true,
    medicineCount: 380,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "City Pharma",
    address: "789 Care Boulevard, Downtown",
    distance: 2.1,
    rating: 4.5,
    reviews: 312,
    phone: "+1 555-0789",
    hours: "8:00 AM - 11:00 PM",
    isOpen: true,
    medicineCount: 550,
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Wellness Drugstore",
    address: "321 Wellness Road, Suburb",
    distance: 3.5,
    rating: 4.3,
    reviews: 156,
    phone: "+1 555-0321",
    hours: "7:00 AM - 8:00 PM",
    isOpen: false,
    medicineCount: 290,
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    name: "QuickMed Pharmacy",
    address: "555 Express Lane, Business Park",
    distance: 4.2,
    rating: 4.7,
    reviews: 98,
    phone: "+1 555-0555",
    hours: "24 Hours",
    isOpen: true,
    medicineCount: 620,
    image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    name: "Family Care Drugs",
    address: "888 Community Street, Residential Area",
    distance: 5.0,
    rating: 4.4,
    reviews: 203,
    phone: "+1 555-0888",
    hours: "8:00 AM - 9:00 PM",
    isOpen: true,
    medicineCount: 340,
    image: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=400&h=300&fit=crop",
  },
];

const PharmaciesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"distance" | "rating" | "medicines">("distance");
  const [showOpenOnly, setShowOpenOnly] = useState(false);

  const filteredPharmacies = mockPharmacies
    .filter(p => {
      if (showOpenOnly && !p.isOpen) return false;
      if (searchQuery) {
        return p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               p.address.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "medicines":
          return b.medicineCount - a.medicineCount;
        default:
          return a.distance - b.distance;
      }
    });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Page Header */}
        <div className="bg-card border-b border-border py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              Nearby Pharmacies
            </h1>
            <p className="text-muted-foreground">
              Find pharmacies near you sorted by road distance
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card border-b border-border py-4 sticky top-16 md:top-20 z-40">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              {/* Search */}
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search pharmacies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showOpenOnly}
                    onChange={(e) => setShowOpenOnly(e.target.checked)}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm">Open Now</span>
                </label>

                <div className="h-6 w-px bg-border" />

                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Sort:</span>
                  {(["distance", "rating", "medicines"] as const).map(option => (
                    <button
                      key={option}
                      onClick={() => setSortBy(option)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        sortBy === option
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {option === "medicines" ? "Stock" : option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pharmacy Grid */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPharmacies.map((pharmacy, index) => (
              <div
                key={pharmacy.id}
                className={`bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                  index === 0 && sortBy === "distance" ? "ring-2 ring-primary" : ""
                }`}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={pharmacy.image}
                    alt={pharmacy.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium backdrop-blur-sm ${
                      pharmacy.isOpen 
                        ? "bg-primary/90 text-primary-foreground" 
                        : "bg-destructive/90 text-destructive-foreground"
                    }`}>
                      {pharmacy.isOpen ? "Open" : "Closed"}
                    </span>
                    {index === 0 && sortBy === "distance" && (
                      <span className="px-2 py-1 rounded-lg gradient-accent text-accent-foreground text-xs font-medium">
                        Nearest
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-card/90 backdrop-blur-sm flex items-center gap-1.5">
                    <Navigation className="w-4 h-4 text-primary" />
                    <span className="font-semibold">{pharmacy.distance} km</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                    {pharmacy.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    {pharmacy.address}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-sm mb-5">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-500" />
                      <span className="font-medium">{pharmacy.rating}</span>
                      <span className="text-muted-foreground">({pharmacy.reviews})</span>
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Pill className="w-4 h-4 text-primary" />
                      {pharmacy.medicineCount} medicines
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-5">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {pharmacy.hours}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </Button>
                    <Button variant="default" size="sm" className="flex-1">
                      <Navigation className="w-4 h-4 mr-1" />
                      Navigate
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPharmacies.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-secondary mx-auto flex items-center justify-center mb-6">
                <MapPin className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">
                No Pharmacies Found
              </h2>
              <p className="text-muted-foreground">
                Try adjusting your filters or search query.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PharmaciesPage;
