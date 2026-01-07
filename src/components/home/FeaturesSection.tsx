import { Search, MapPin, Navigation, Clock, Shield, Users } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Search,
      title: "Smart Medicine Search",
      description: "Search any medicine by name and instantly find pharmacies that have it in stock.",
      color: "emerald",
    },
    {
      icon: MapPin,
      title: "Location-Based Results",
      description: "Get pharmacy recommendations based on your current location with accurate road distances.",
      color: "sky",
    },
    {
      icon: Navigation,
      title: "Turn-by-Turn Navigation",
      description: "Navigate to your chosen pharmacy with integrated GPS directions and estimated arrival time.",
      color: "coral",
    },
    {
      icon: Clock,
      title: "Real-Time Availability",
      description: "Check live medicine stock levels before you travel, saving time and effort.",
      color: "emerald",
    },
    {
      icon: Shield,
      title: "Verified Pharmacies",
      description: "All listed pharmacies are verified and licensed, ensuring safe and authentic medicines.",
      color: "sky",
    },
    {
      icon: Users,
      title: "Retailer Management",
      description: "Pharmacy owners can easily manage their inventory and keep availability updated.",
      color: "coral",
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "emerald":
        return "bg-emerald-light text-primary";
      case "sky":
        return "bg-sky-light text-sky";
      case "coral":
        return "bg-coral-light text-coral";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Why Pharmigo?
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Everything You Need to Find Medicine Fast
          </h2>
          <p className="text-muted-foreground text-lg">
            Pharmigo combines powerful search, real-time data, and smart navigation to help you get your medicines quickly.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-6 md:p-8 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-xl ${getColorClasses(feature.color)} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
