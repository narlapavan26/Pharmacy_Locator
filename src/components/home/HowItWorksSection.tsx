import { Search, MapPin, Navigation, CheckCircle } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Search Medicine",
      description: "Enter the name of the medicine you're looking for in our smart search bar.",
    },
    {
      number: "02",
      icon: MapPin,
      title: "Find Nearby Pharmacies",
      description: "View a list of pharmacies sorted by road distance that have your medicine in stock.",
    },
    {
      number: "03",
      icon: Navigation,
      title: "Navigate & Get Medicine",
      description: "Get directions to your chosen pharmacy and pick up your medicine hassle-free.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-secondary/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            How Pharmigo Works
          </h2>
          <p className="text-muted-foreground text-lg">
            Finding your medicine is as easy as 1-2-3. No more calling multiple pharmacies!
          </p>
        </div>

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-24 left-[16.5%] right-[16.5%] h-0.5 bg-gradient-to-r from-primary via-primary to-primary/30" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                {/* Step Number Circle */}
                <div className="relative inline-flex mb-6">
                  <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center shadow-glow">
                    <step.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-card shadow-md flex items-center justify-center text-sm font-bold text-primary font-display">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Success Message */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-emerald-light text-primary font-medium">
            <CheckCircle className="w-5 h-5" />
            <span>Over 50,000 successful medicine searches every month!</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
