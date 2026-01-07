import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Store, ArrowRight, Pill } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User CTA */}
          <div className="relative overflow-hidden rounded-3xl gradient-primary p-8 md:p-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mb-6">
                <Pill className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-4">
                Need Medicine?
              </h3>
              <p className="text-primary-foreground/80 mb-8 max-w-md">
                Start searching for medicines and find the nearest pharmacy with stock available. Get directions instantly.
              </p>
              <Button variant="glass" size="lg" asChild className="bg-white/20 text-primary-foreground hover:bg-white/30 border-white/20">
                <Link to="/search" className="flex items-center gap-2">
                  Start Searching
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Retailer CTA */}
          <div className="relative overflow-hidden rounded-3xl bg-card border border-border p-8 md:p-12 shadow-card">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6">
                <Store className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                Own a Pharmacy?
              </h3>
              <p className="text-muted-foreground mb-8 max-w-md">
                Register your pharmacy on Pharmigo and reach thousands of customers looking for medicines in your area.
              </p>
              <Button variant="default" size="lg" asChild>
                <Link to="/retailer/register" className="flex items-center gap-2">
                  Register as Retailer
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
