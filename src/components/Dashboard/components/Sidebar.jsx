import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, FileText, Users, ShoppingCart, Package,
  BarChart2, Building2, UserPlus, Truck, ChevronRight,
  PlusCircle, ClipboardList, ArrowLeftRight, X, LogOut,
} from "lucide-react";
import { APILogout } from "../../../API/APILogin";

function Sidebar({ onCloseMobile, isMobileOpen }) {
  const location = useLocation();
  const navigate  = useNavigate();
  const user      = JSON.parse(localStorage?.getItem("user")) || { username: "Admin" };

  const [expandedCategory, setExpandedCategory] = useState(null);

  const dashboardItem = { title: "Dashboard", icon: <LayoutDashboard size={17} />, path: "/dashboard", exact: true };

  const menuCategories = useCallback(() => ({
    "Documents": [
      { title: "GRNs",     icon: <ClipboardList size={15} />, path: "/dashboard/grn" },
      { title: "Invoices", icon: <FileText size={15} />,      path: "/dashboard/invoices" },
    ],
    "People": [
      { title: "Users",        icon: <Users size={15} />,    path: "/dashboard/users" },
      { title: "Customers",    icon: <Users size={15} />,    path: "/dashboard/customers" },
      { title: "Add Customer", icon: <UserPlus size={15} />, path: "/dashboard/customerregister" },
    ],
    "Inventory": [
      { title: "Products",    icon: <Package size={15} />,        path: "/dashboard/products" },
      { title: "Add Product", icon: <PlusCircle size={15} />,     path: "/dashboard/addproduct" },
      { title: "Purchase",    icon: <ShoppingCart size={15} />,   path: "/dashboard/purchase" },
      { title: "GRN Return",  icon: <ArrowLeftRight size={15} />, path: "/dashboard/grnreturn" },
    ],
    "Transactions": [
      { title: "Sales",          icon: <BarChart2 size={15} />,      path: "/dashboard/sales" },
      { title: "Invoice Return", icon: <ArrowLeftRight size={15} />, path: "/dashboard/invoicereturn" },
    ],
    "Business": [
      { title: "Add Supplier", icon: <Truck size={15} />,     path: "/dashboard/supplierregister" },
      { title: "Organization", icon: <Building2 size={15} />, path: "/dashboard/organization" },
    ],
  }), []);

  const toggleCategory = (cat) => setExpandedCategory(prev => prev === cat ? null : cat);

  const isActive = useCallback((path, exact = false) =>
    exact ? location.pathname === path : location.pathname.startsWith(path),
  [location.pathname]);

  const isCategoryActive = useCallback((items) =>
    items.some(item => isActive(item.path, item.exact)),
  [isActive]);

  const handleNavigation = (path, e) => {
    e.preventDefault();
    navigate(path);
    setTimeout(() => onCloseMobile(), 150);
  };

  useEffect(() => {
    const categories = menuCategories();
    for (const [cat, items] of Object.entries(categories)) {
      if (isCategoryActive(items)) { setExpandedCategory(cat); break; }
    }
  }, [isCategoryActive, menuCategories]);

  const handleLogout = async () => {
    await APILogout();
    window.location.href = "/";
  };

  return (
    <aside
      className={`fixed lg:relative h-full inset-y-0 left-0 flex flex-col z-50 w-60
        bg-[#1A1915] border-r border-[#2E2C28] overflow-hidden
        transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
    >
      {/* Brand */}
      <div className="flex items-center justify-between h-16 px-5 flex-shrink-0 border-b border-[#2E2C28]">
        <Link to="/dashboard" className="flex items-center gap-2.5">
          <img src="/HyperPOS.svg" alt="HyperPOS" className="w-5 h-5 object-contain brightness-0 invert" />
          <span className="text-[#E8E6DF] font-semibold text-[15px] tracking-tight">HyperPOS</span>
        </Link>
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-md text-[#7A786F] hover:text-[#E8E6DF] hover:bg-white/[0.06] transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3" style={{ scrollbarWidth: 'thin', scrollbarColor: '#2E2C28 transparent' }}>

        {/* Dashboard direct link */}
        <div className="mb-1">
          <Link
            to={dashboardItem.path}
            onClick={(e) => handleNavigation(dashboardItem.path, e)}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors duration-[120ms] group ${
              isActive(dashboardItem.path, dashboardItem.exact)
                ? "bg-[rgba(79,122,63,0.12)] text-[#E8E6DF]"
                : "text-[#7A786F] hover:text-[#B8B4AB] hover:bg-white/[0.04]"
            }`}
          >
            <span className={isActive(dashboardItem.path, dashboardItem.exact) ? "text-[#4F7A3F]" : "text-[#4A4845] group-hover:text-[#7A786F]"}>
              {dashboardItem.icon}
            </span>
            {dashboardItem.title}
          </Link>
        </div>

        <div className="my-3 h-px bg-[#2E2C28]" />

        {/* Categories */}
        <div className="space-y-0.5">
          {Object.entries(menuCategories()).map(([category, items]) => {
            const catActive  = isCategoryActive(items);
            const isExpanded = expandedCategory === category;
            return (
              <div key={category}>
                <button
                  onClick={() => toggleCategory(category)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-[10.5px] font-bold uppercase tracking-[0.09em] transition-colors duration-[120ms] ${
                    catActive || isExpanded ? "text-[#B8B4AB]" : "text-[#4A4845] hover:text-[#7A786F]"
                  }`}
                >
                  <span>{category}</span>
                  <ChevronRight
                    size={12}
                    className={`transition-transform duration-[180ms] ${isExpanded ? "rotate-90 text-[#4F7A3F]" : "text-[#4A4845]"}`}
                  />
                </button>

                <div className={`overflow-hidden transition-all duration-[180ms] ${isExpanded ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="ml-3 pl-3 border-l border-[#2E2C28] space-y-0.5 py-0.5">
                    {items.map((item, idx) => {
                      const active = isActive(item.path, item.exact);
                      return (
                        <Link
                          key={idx}
                          to={item.path}
                          onClick={(e) => handleNavigation(item.path, e)}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-[7px] text-[13px] transition-colors duration-[120ms] group relative ${
                            active ? "text-[#E8E6DF] font-medium bg-[rgba(79,122,63,0.10)]"
                                   : "text-[#7A786F] hover:text-[#B8B4AB] hover:bg-white/[0.04]"
                          }`}
                        >
                          {active && (
                            <span className="absolute -left-[13px] top-1/2 -translate-y-1/2 w-0.5 h-3.5 bg-[#4F7A3F] rounded-r-sm" />
                          )}
                          <span className={active ? "text-[#4F7A3F]" : "text-[#4A4845] group-hover:text-[#7A786F]"}>
                            {item.icon}
                          </span>
                          {item.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </nav>

      {/* User footer */}
      <div className="flex-shrink-0 px-4 py-3 border-t border-[#2E2C28]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#2E2C28] flex items-center justify-center flex-shrink-0">
            <span className="text-[#4F7A3F] text-[11px] font-bold uppercase">
              {user.username?.[0] || "A"}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-medium text-[#E8E6DF] truncate">{user.username || "Admin"}</p>
            <p className="text-[11px] text-[#7A786F] truncate">Administrator</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-md text-[#7A786F] hover:text-[#C0392B] hover:bg-[rgba(192,57,43,0.10)] transition-colors"
            title="Sign out"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
