import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  FileText,
  Users,
  ShoppingCart,
  Package,
  BarChart2,
  Building2,
  UserPlus,
  Truck,
  ChevronRight,
  PlusCircle,
  ClipboardList,
  ArrowLeftRight,
  X,
} from "lucide-react";

function Sidebar({ onCloseMobile, isMobileOpen }) {

  const location  = useLocation();
  const navigate  = useNavigate();
  const user      = JSON.parse(localStorage?.getItem("user")) || { username: "Admin" };

  const [expandedCategory, setExpandedCategory] = useState(null);

  const dashboardItem = {
    title : "Dashboard",
    icon  : <LayoutDashboard size={18} />,
    path  : "/dashboard",
    exact : true,
  };

  const menuCategories = useCallback(() => ({
    "Documents": [
      { title: "GRNs",      icon: <ClipboardList size={16} />, path: "/dashboard/grn" },
      { title: "Invoices",  icon: <FileText size={16} />,      path: "/dashboard/invoices" },
    ],
    "People": [
      { title: "Users",        icon: <Users size={16} />,    path: "/dashboard/users" },
      { title: "Customers",    icon: <Users size={16} />,    path: "/dashboard/customers" },
      { title: "Add Customer", icon: <UserPlus size={16} />, path: "/dashboard/customerregister" },
    ],
    "Inventory": [
      { title: "Products",    icon: <Package size={16} />,       path: "/dashboard/products" },
      { title: "Add Product", icon: <PlusCircle size={16} />,    path: "/dashboard/addproduct" },
      { title: "Purchase",    icon: <ShoppingCart size={16} />,  path: "/dashboard/purchase" },
      { title: "GRN Return",  icon: <ArrowLeftRight size={16} />,path: "/dashboard/grnreturn" },
    ],
    "Transactions": [
      { title: "Sales",           icon: <BarChart2 size={16} />,      path: "/dashboard/sales" },
      { title: "Invoice Return",  icon: <ArrowLeftRight size={16} />, path: "/dashboard/invoicereturn" },
    ],
    "Business": [
      { title: "Add Supplier",  icon: <Truck size={16} />,    path: "/dashboard/supplierregister" },
      { title: "Organization",  icon: <Building2 size={16} />, path: "/dashboard/organization" },
    ],
  }), []);

  const toggleCategory = (category) => {
    setExpandedCategory(prev => prev === category ? null : category);
  };

  const isActive = useCallback((path, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  }, [location.pathname]);

  const isCategoryActive = useCallback((items) => {
    return items.some(item => isActive(item.path, item.exact));
  }, [isActive]);

  const handleNavigation = (path, e) => {
    e.preventDefault();
    navigate(path);
    setTimeout(() => { onCloseMobile(); }, 150);
  };

  useEffect(() => {
    const categories = menuCategories();
    for (const [category, items] of Object.entries(categories)) {
      if (isCategoryActive(items)) {
        setExpandedCategory(category);
        break;
      }
    }
  }, [isCategoryActive, menuCategories]);

  return (

    <aside
      className={`fixed lg:relative h-screen inset-y-0 left-0 flex flex-col z-30 w-64
        transition-transform duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      style={{ background: "var(--sidebar-bg, #0a0f1e)" }}
    >

      {/* ── Brand area ── */}
      <div className="flex items-center justify-between h-16 px-5 flex-shrink-0"
           style={{ borderBottom: "1px solid var(--sidebar-border, rgba(255,255,255,0.06))" }}>

        <Link to="/dashboard" className="flex items-center gap-2.5">
          <img src="/HyperPOS.svg" alt="HyperPOS" className="w-8 h-8 object-contain" />
          <span className="text-white font-bold text-base tracking-tight">HyperPOS</span>
        </Link>

        {/* Mobile close */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 hyper-scrollbar">

        {/* ─ Dashboard ─ */}
        <div className="mb-1">
          <Link
            to={dashboardItem.path}
            onClick={(e) => handleNavigation(dashboardItem.path, e)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
              isActive(dashboardItem.path, dashboardItem.exact)
                ? "bg-indigo-500/[0.15] text-indigo-400"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
            }`}
          >
            <span className={isActive(dashboardItem.path, dashboardItem.exact) ? "text-indigo-400" : "text-slate-500"}>
              {dashboardItem.icon}
            </span>
            {dashboardItem.title}
          </Link>
        </div>

        {/* ─ Divider ─ */}
        <div className="my-3 mx-1" style={{ borderTop: "1px solid var(--sidebar-border, rgba(255,255,255,0.06))" }} />

        {/* ─ Collapsible categories ─ */}
        <div className="space-y-0.5">
          {Object.entries(menuCategories()).map(([category, items]) => (
            <div key={category}>

              {/* Category header */}
              <button
                onClick={() => toggleCategory(category)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors duration-150 ${
                  isCategoryActive(items)
                    ? "text-indigo-400"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                <span>{category}</span>
                <ChevronRight
                  size={13}
                  className={`transition-transform duration-200 ${expandedCategory === category ? "rotate-90" : ""}`}
                />
              </button>

              {/* Menu items */}
              <div className={`overflow-hidden transition-all duration-200 ${
                expandedCategory === category ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}>
                <div className="ml-2 mt-0.5 space-y-0.5">
                  {items.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.path}
                      onClick={(e) => handleNavigation(item.path, e)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                        isActive(item.path, item.exact)
                          ? "bg-indigo-500/[0.15] text-indigo-400 font-medium"
                          : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                      }`}
                    >
                      <span className={isActive(item.path, item.exact) ? "text-indigo-400" : "text-slate-500"}>
                        {item.icon}
                      </span>
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </nav>

      {/* ── User footer ── */}
      <div className="flex-shrink-0 px-4 py-4"
           style={{ borderTop: "1px solid var(--sidebar-border, rgba(255,255,255,0.06))" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
            <span className="text-indigo-400 text-xs font-bold uppercase">
              {user.username?.[0] || "A"}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-200 truncate">{user.username || "Admin"}</p>
            <p className="text-xs text-slate-500 truncate">Administrator</p>
          </div>
        </div>
      </div>

    </aside>
  );
}

export default Sidebar;
