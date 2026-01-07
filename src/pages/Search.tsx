import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Navigation, Pill, Clock, Phone, Star, Filter, X } from "lucide-react";

// Mock data for demonstration
const mockMedicines = [
  { id: 1, name: "Paracetamol 500mg", category: "Pain Relief", manufacturer: "Sun Pharma" },
  { id: 2, name: "Amoxicillin 250mg", category: "Antibiotic", manufacturer: "Cipla" },
  { id: 3, name: "Omeprazole 20mg", category: "Gastric", manufacturer: "Dr. Reddy's" },
  { id: 4, name: "Cetirizine 10mg", category: "Allergy", manufacturer: "Lupin" },
  { id: 5, name: "Metformin 500mg", category: "Diabetes", manufacturer: "Sun Pharma" },
];

const mockPharmacies = [
  {
    id: 1,
    name: "HealthCare Pharmacy",
    address: "123 Main Street, Medical District",
    distance: 0.8,
    rating: 4.8,
    phone: "+1 555-0123",
    hours: "8:00 AM - 10:00 PM",
    isOpen: true,
    medicines: [1, 2, 3, 4],
    price: 45,
  },
  {
    id: 2,
    name: "MediPlus Store",
    address: "456 Health Avenue, City Center",
    distance: 1.2,
    rating: 4.6,
    phone: "+1 555-0456",
    hours: "9:00 AM - 9:00 PM",
    isOpen: true,
    medicines: [1, 2, 5],
    price: 42,
  },
  {
    id: 3,
    name: "City Pharma",
    address: "789 Care Boulevard, Downtown",
    distance: 2.1,
    rating: 4.5,
    phone: "+1 555-0789",
    hours: "8:00 AM - 11:00 PM",
    isOpen: true,
    medicines: [1, 3, 4, 5],
    price: 48,
  },
  {
    id: 4,
    name: "Wellness Drugstore",
    address: "321 Wellness Road, Suburb",
    distance: 3.5,
    rating: 4.3,
    phone: "+1 555-0321",
    hours: "7:00 AM - 8:00 PM",
    isOpen: false,
    medicines: [2, 3, 5],
    price: 40,
  },
];

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [selectedMedicine, setSelectedMedicine] = useState<typeof mockMedicines[0] | null>(null);
  const [filteredPharmacies, setFilteredPharmacies] = useState(mockPharmacies);
  const [sortBy, setSortBy] = useState<"distance" | "price" | "rating">("distance");

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setQuery(q);
      // Find matching medicine
      const medicine = mockMedicines.find(m => 
        m.name.toLowerCase().includes(q.toLowerCase())
      );
      if (medicine) {
        setSelectedMedicine(medicine);
        // Filter pharmacies that have this medicine
        const pharmaciesWithMedicine = mockPharmacies.filter(p => 
          p.medicines.includes(medicine.id)
        );
        setFilteredPharmacies(pharmaciesWithMedicine);
      }
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: query });
  };

  const sortedPharmacies = [...filteredPharmacies].sort((a, b) => {
    switch (sortBy) {
      case "price":
        return a.price - b.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return a.distance - b.distance;
    }
  });

  const handleNavigate = (pharmacy: typeof mockPharmacies[0]) => {
    // In a real app, this would open Google Maps or similar
    alert(`Opening navigation to ${pharmacy.name}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Search Header */}
        <div className="bg-card border-b border-border py-6">
          <div className="container mx-auto px-4">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for medicines..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-12 h-12 bg-background"
                />
              </div>
              <Button type="submit" variant="default" size="lg">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </form>

            {/* Medicine Suggestions */}
            {query && !selectedMedicine && (
              <div className="mt-4 flex flex-wrap gap-2">
                {mockMedicines
                  .filter(m => m.name.toLowerCase().includes(query.toLowerCase()))
                  .map(medicine => (
                    <button
                      key={medicine.id}
                      onClick={() => {
                        setQuery(medicine.name);
                        setSearchParams({ q: medicine.name });
                      }}
                      className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors text-sm"
                    >
                      {medicine.name}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="container mx-auto px-4 py-8">
          {selectedMedicine ? (
            <>
              {/* Selected Medicine Info */}
              <div className="bg-emerald-light rounded-2xl p-6 mb-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center">
                      <Pill className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="text-xl font-display font-bold text-foreground">
                        {selectedMedicine.name}
                      </h2>
                      <p className="text-muted-foreground">
                        {selectedMedicine.category} • {selectedMedicine.manufacturer}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedMedicine(null);
                      setQuery("");
                      setSearchParams({});
                      setFilteredPharmacies(mockPharmacies);
                    }}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </div>

              {/* Sort Options */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <h3 className="font-display font-semibold text-lg">
                  {sortedPharmacies.length} Pharmacies Found
                </h3>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground mr-2">Sort by:</span>
                  {(["distance", "price", "rating"] as const).map(option => (
                    <button
                      key={option}
                      onClick={() => setSortBy(option)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        sortBy === option
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pharmacy Cards */}
              <div className="grid gap-4">
                {sortedPharmacies.map((pharmacy, index) => (
                  <div
                    key={pharmacy.id}
                    className={`bg-card rounded-2xl p-6 shadow-card hover:shadow-lg transition-all duration-300 ${
                      index === 0 ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      {/* Pharmacy Info */}
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-emerald-light flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-display font-semibold text-lg text-foreground">
                                {pharmacy.name}
                              </h4>
                              {index === 0 && (
                                <span className="px-2 py-0.5 rounded-full gradient-primary text-primary-foreground text-xs font-medium">
                                  Nearest
                                </span>
                              )}
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                pharmacy.isOpen 
                                  ? "bg-emerald-light text-primary" 
                                  : "bg-destructive/10 text-destructive"
                              }`}>
                                {pharmacy.isOpen ? "Open" : "Closed"}
                              </span>
                            </div>
                            <p className="text-muted-foreground text-sm mt-1">
                              {pharmacy.address}
                            </p>
                            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
                              <span className="flex items-center gap-1 text-muted-foreground">
                                <Navigation className="w-4 h-4 text-primary" />
                                {pharmacy.distance} km
                              </span>
                              <span className="flex items-center gap-1 text-muted-foreground">
                                <Star className="w-4 h-4 text-amber-500" />
                                {pharmacy.rating}
                              </span>
                              <span className="flex items-center gap-1 text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                {pharmacy.hours}
                              </span>
                              <span className="flex items-center gap-1 text-muted-foreground">
                                <Phone className="w-4 h-4" />
                                {pharmacy.phone}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Price & Action */}
                      <div className="flex items-center gap-4 lg:flex-col lg:items-end">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Price</p>
                          <p className="text-2xl font-display font-bold text-foreground">
                            ₹{pharmacy.price}
                          </p>
                        </div>
                        <Button
                          variant="hero"
                          onClick={() => handleNavigate(pharmacy)}
                          disabled={!pharmacy.isOpen}
                        >
                          <Navigation className="w-4 h-4" />
                          Navigate
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-secondary mx-auto flex items-center justify-center mb-6">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">
                Search for a Medicine
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Enter the name of a medicine above to find nearby pharmacies that have it in stock.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchPage;
