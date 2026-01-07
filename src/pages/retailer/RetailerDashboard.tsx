import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Store, Package, Plus, Search, Edit, Trash2, LogOut,
  Pill, TrendingUp, Users, Clock, Menu, X
} from "lucide-react";

const mockInventory = [
  { id: 1, name: "Paracetamol 500mg", category: "Pain Relief", stock: 150, price: 45, status: "in_stock" },
  { id: 2, name: "Amoxicillin 250mg", category: "Antibiotic", stock: 25, price: 120, status: "low_stock" },
  { id: 3, name: "Omeprazole 20mg", category: "Gastric", stock: 80, price: 65, status: "in_stock" },
  { id: 4, name: "Cetirizine 10mg", category: "Allergy", stock: 200, price: 35, status: "in_stock" },
  { id: 5, name: "Metformin 500mg", category: "Diabetes", stock: 0, price: 55, status: "out_of_stock" },
  { id: 6, name: "Aspirin 75mg", category: "Cardiac", stock: 5, price: 40, status: "low_stock" },
];

const RetailerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [inventory, setInventory] = useState(mockInventory);

  const stats = [
    { label: "Total Medicines", value: inventory.length, icon: Pill, color: "emerald" },
    { label: "In Stock", value: inventory.filter(i => i.status === "in_stock").length, icon: Package, color: "sky" },
    { label: "Low Stock", value: inventory.filter(i => i.status === "low_stock").length, icon: TrendingUp, color: "coral" },
    { label: "Out of Stock", value: inventory.filter(i => i.status === "out_of_stock").length, icon: Clock, color: "destructive" },
  ];

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_stock": return "bg-emerald-light text-primary";
      case "low_stock": return "bg-amber-100 text-amber-700";
      case "out_of_stock": return "bg-destructive/10 text-destructive";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "in_stock": return "In Stock";
      case "low_stock": return "Low Stock";
      case "out_of_stock": return "Out of Stock";
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50 flex items-center justify-between px-4">
        <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-secondary rounded-lg">
          <Menu className="w-6 h-6" />
        </button>
        <span className="font-display font-bold">Retailer Portal</span>
        <div className="w-10" />
      </div>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 bottom-0 w-64 bg-card border-r border-border z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Pill className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-display font-bold">Pharmigo</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 hover:bg-secondary rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Pharmacy Info */}
          <div className="bg-secondary rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Store className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">HealthCare Pharmacy</p>
                <p className="text-xs text-muted-foreground">License: PH-2024-12345</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-medium">
              <Package className="w-5 h-5" />
              Inventory
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
              <TrendingUp className="w-5 h-5" />
              Analytics
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
              <Users className="w-5 h-5" />
              Customers
            </a>
          </nav>
        </div>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <LogOut className="w-5 h-5" />
            Logout
          </Link>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-foreground/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">
              Inventory Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your medicine catalog and stock levels
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-card rounded-xl p-5 shadow-card">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    stat.color === "emerald" ? "bg-emerald-light" :
                    stat.color === "sky" ? "bg-sky-light" :
                    stat.color === "coral" ? "bg-coral-light" :
                    "bg-destructive/10"
                  }`}>
                    <stat.icon className={`w-5 h-5 ${
                      stat.color === "emerald" ? "text-primary" :
                      stat.color === "sky" ? "text-sky" :
                      stat.color === "coral" ? "text-coral" :
                      "text-destructive"
                    }`} />
                  </div>
                </div>
                <p className="text-2xl font-display font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search medicines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="hero">
              <Plus className="w-4 h-4" />
              Add Medicine
            </Button>
          </div>

          {/* Inventory Table */}
          <div className="bg-card rounded-xl shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Medicine</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Category</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Stock</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Price</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Status</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInventory.map((item) => (
                    <tr key={item.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-emerald-light flex items-center justify-center">
                            <Pill className="w-5 h-5 text-primary" />
                          </div>
                          <span className="font-medium">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{item.category}</td>
                      <td className="px-6 py-4 font-medium">{item.stock}</td>
                      <td className="px-6 py-4 font-medium">₹{item.price}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {getStatusLabel(item.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                            <Edit className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button className="p-2 hover:bg-destructive/10 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RetailerDashboard;
