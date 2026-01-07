import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Shield, Store, Package, Users, Search, Edit, Trash2, LogOut,
  Pill, TrendingUp, CheckCircle, XCircle, Menu, X, Plus
} from "lucide-react";

const mockRetailers = [
  { id: 1, name: "HealthCare Pharmacy", owner: "John Smith", email: "john@healthcare.com", status: "approved", medicines: 420, joined: "2024-01-15" },
  { id: 2, name: "MediPlus Store", owner: "Sarah Johnson", email: "sarah@mediplus.com", status: "approved", medicines: 380, joined: "2024-02-20" },
  { id: 3, name: "City Pharma", owner: "Mike Brown", email: "mike@citypharma.com", status: "pending", medicines: 0, joined: "2024-03-10" },
  { id: 4, name: "Wellness Drugstore", owner: "Emily Davis", email: "emily@wellness.com", status: "approved", medicines: 290, joined: "2024-01-05" },
  { id: 5, name: "QuickMed Pharmacy", owner: "David Wilson", email: "david@quickmed.com", status: "pending", medicines: 0, joined: "2024-03-15" },
];

const mockMedicines = [
  { id: 1, name: "Paracetamol 500mg", category: "Pain Relief", manufacturer: "Sun Pharma", retailers: 45 },
  { id: 2, name: "Amoxicillin 250mg", category: "Antibiotic", manufacturer: "Cipla", retailers: 38 },
  { id: 3, name: "Omeprazole 20mg", category: "Gastric", manufacturer: "Dr. Reddy's", retailers: 52 },
  { id: 4, name: "Cetirizine 10mg", category: "Allergy", manufacturer: "Lupin", retailers: 41 },
  { id: 5, name: "Metformin 500mg", category: "Diabetes", manufacturer: "Sun Pharma", retailers: 35 },
];

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"retailers" | "medicines">("retailers");
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    { label: "Total Retailers", value: mockRetailers.length, icon: Store, color: "emerald" },
    { label: "Pending Approval", value: mockRetailers.filter(r => r.status === "pending").length, icon: Users, color: "coral" },
    { label: "Total Medicines", value: mockMedicines.length, icon: Pill, color: "sky" },
    { label: "Active Users", value: "2,847", icon: TrendingUp, color: "emerald" },
  ];

  const filteredRetailers = mockRetailers.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMedicines = mockMedicines.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50 flex items-center justify-between px-4">
        <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-secondary rounded-lg">
          <Menu className="w-6 h-6" />
        </button>
        <span className="font-display font-bold">Admin Panel</span>
        <div className="w-10" />
      </div>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 bottom-0 w-64 bg-foreground text-background z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center">
                <Shield className="w-5 h-5 text-foreground" />
              </div>
              <span className="text-lg font-display font-bold">Admin</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 hover:bg-background/10 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("retailers")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === "retailers" ? "bg-background text-foreground" : "text-background/70 hover:text-background hover:bg-background/10"
              }`}
            >
              <Store className="w-5 h-5" />
              Retailers
            </button>
            <button
              onClick={() => setActiveTab("medicines")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === "medicines" ? "bg-background text-foreground" : "text-background/70 hover:text-background hover:bg-background/10"
              }`}
            >
              <Package className="w-5 h-5" />
              Medicines
            </button>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-background/70 hover:text-background hover:bg-background/10 transition-colors">
              <TrendingUp className="w-5 h-5" />
              Analytics
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-background/70 hover:text-background hover:bg-background/10 transition-colors">
              <Users className="w-5 h-5" />
              Users
            </a>
          </nav>
        </div>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-background/10">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-background/70 hover:text-background hover:bg-background/10 transition-colors">
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
              {activeTab === "retailers" ? "Retailer Management" : "Medicine Catalog"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {activeTab === "retailers" 
                ? "Manage pharmacy registrations and approvals" 
                : "Manage the master medicine database"}
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
                    "bg-coral-light"
                  }`}>
                    <stat.icon className={`w-5 h-5 ${
                      stat.color === "emerald" ? "text-primary" :
                      stat.color === "sky" ? "text-sky" :
                      "text-coral"
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
                placeholder={activeTab === "retailers" ? "Search retailers..." : "Search medicines..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="hero">
              <Plus className="w-4 h-4" />
              {activeTab === "retailers" ? "Add Retailer" : "Add Medicine"}
            </Button>
          </div>

          {/* Content */}
          {activeTab === "retailers" ? (
            <div className="bg-card rounded-xl shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Pharmacy</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Owner</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Medicines</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Status</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Joined</th>
                      <th className="text-right px-6 py-4 text-sm font-semibold text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRetailers.map((retailer) => (
                      <tr key={retailer.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                              <Store className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{retailer.name}</p>
                              <p className="text-xs text-muted-foreground">{retailer.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{retailer.owner}</td>
                        <td className="px-6 py-4 font-medium">{retailer.medicines}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            retailer.status === "approved" 
                              ? "bg-emerald-light text-primary" 
                              : "bg-amber-100 text-amber-700"
                          }`}>
                            {retailer.status === "approved" ? "Approved" : "Pending"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{retailer.joined}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            {retailer.status === "pending" && (
                              <>
                                <button className="p-2 hover:bg-emerald-light rounded-lg transition-colors">
                                  <CheckCircle className="w-4 h-4 text-primary" />
                                </button>
                                <button className="p-2 hover:bg-destructive/10 rounded-lg transition-colors">
                                  <XCircle className="w-4 h-4 text-destructive" />
                                </button>
                              </>
                            )}
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
          ) : (
            <div className="bg-card rounded-xl shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Medicine</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Category</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Manufacturer</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Available At</th>
                      <th className="text-right px-6 py-4 text-sm font-semibold text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMedicines.map((medicine) => (
                      <tr key={medicine.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-emerald-light flex items-center justify-center">
                              <Pill className="w-5 h-5 text-primary" />
                            </div>
                            <span className="font-medium">{medicine.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{medicine.category}</td>
                        <td className="px-6 py-4 text-muted-foreground">{medicine.manufacturer}</td>
                        <td className="px-6 py-4 font-medium">{medicine.retailers} pharmacies</td>
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
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
