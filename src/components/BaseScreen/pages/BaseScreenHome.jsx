import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Calculator, RefreshCw, UserPlus, ChevronRight,
  TrendingUp, ShoppingBag, FileText, AlertCircle, Eye, X,
} from "lucide-react";
import { getSaleData }    from "../../Dashboard/data/salesData";
import { getProductData } from "../../Dashboard/data/productData";
import { getInvoiceData } from "../../Dashboard/data/invoiceData";

function SaleModal({ sale, onClose }) {
  const fmt = d => d ? new Date(d).toLocaleString() : "-";
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
          <h2 className="text-base font-semibold text-zinc-900">Sale Details</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-6 py-5 space-y-4">
          <div>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3 pb-1 border-b border-zinc-100">Invoice</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                ["Invoice ID",   sale.invoice.id],
                ["Customer ID",  sale.invoice.customerId],
                ["Payment",      sale.invoice.paymentMethod],
                ["Date",         fmt(sale.invoice.updatedAt)],
              ].map(([label, val]) => (
                <div key={label}>
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-0.5">{label}</p>
                  <p className="text-zinc-700">{val}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 flex items-center justify-between">
            <span className="text-sm text-zinc-600 font-medium">Total</span>
            <span className="text-lg font-bold text-emerald-600">Rs {sale.invoice.total.toLocaleString()}</span>
          </div>

          <div>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3 pb-1 border-b border-zinc-100">
              Items ({sale.items.length})
            </h3>
            <div className="space-y-2">
              {sale.items.map(item => (
                <div key={item.id} className="bg-zinc-50 rounded-lg px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-zinc-700">Product #{item.productId}</p>
                    <p className="text-xs text-zinc-400">Qty: {item.quantity} · Unit: Rs {item.unitPrice?.toLocaleString()} · Disc: {item.discount}%</p>
                  </div>
                  <p className="text-sm font-semibold text-emerald-600">Rs {item.amount?.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-100 flex justify-end">
          <button onClick={onClose} className="pos-btn-primary">Close</button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, accentColor, isLoading }) {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
      <div className={`h-1 w-full ${accentColor}`} />
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{label}</span>
          <span className="text-zinc-300">{icon}</span>
        </div>
        {isLoading
          ? <div className="h-7 w-24 bg-zinc-100 animate-pulse rounded-md" />
          : <p className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">{value}</p>
        }
      </div>
    </div>
  );
}

const navCards = [
  { title: "Cashier",               desc: "Process sales and generate invoices",       icon: <Calculator size={22} />, path: "/basescreen/cashier" },
  { title: "Invoice Return",        desc: "Process returns and refunds",               icon: <RefreshCw size={22} />,  path: "/basescreen/invoice-return" },
  { title: "Customer Registration", desc: "Register new customers in the system",      icon: <UserPlus size={22} />,   path: "/basescreen/customer-registration" },
];

function BaseScreenHome() {
  const [salesData,    setSalesData]    = useState([]);
  const [productData,  setProductData]  = useState([]);
  const [isLoading,    setIsLoading]    = useState(true);
  const [stats,        setStats]        = useState({ todaySales: 0, transactionCount: 0, openInvoices: 0, lowStockItems: 0 });
  const [selectedSale, setSelectedSale] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const [sales, products, invoices] = await Promise.all([getSaleData(), getProductData(), getInvoiceData()]);
        setSalesData(sales    || []);
        setProductData(products || []);
        const today = new Date(); today.setHours(0, 0, 0, 0);
        const todaySales = (sales || []).filter(s => {
          const d = new Date(s.invoice?.createdAt || s.invoice?.updatedAt);
          d.setHours(0, 0, 0, 0);
          return d.getTime() === today.getTime();
        });
        setStats({
          todaySales: todaySales.reduce((t, s) => t + (s.invoice?.total || 0), 0),
          transactionCount: todaySales.length,
          openInvoices: (invoices || []).filter(i => i.status === "PENDING" || i.status === "UNPAID").length,
          lowStockItems: (products || []).filter(p => (p.quantity || 0) < 10).length,
        });
      } catch (err) { console.error("Error fetching data:", err); }
      finally { setIsLoading(false); }
    })();
  }, []);

  const fmt = d => d ? new Date(d).toLocaleDateString() : "-";

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">Cashier Dashboard</h1>
        <p className="text-sm text-zinc-500 mt-0.5">Today's overview and quick access</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<TrendingUp size={18} />}  label="Today's Sales"   value={`Rs ${stats.todaySales.toLocaleString()}`} accentColor="bg-blue-500"    isLoading={isLoading} />
        <StatCard icon={<ShoppingBag size={18} />} label="Transactions"    value={stats.transactionCount}                    accentColor="bg-sky-500"     isLoading={isLoading} />
        <StatCard icon={<FileText size={18} />}    label="Open Invoices"   value={stats.openInvoices}                        accentColor="bg-amber-500"   isLoading={isLoading} />
        <StatCard icon={<AlertCircle size={18} />} label="Low Stock Items" value={stats.lowStockItems}                       accentColor="bg-red-500"     isLoading={isLoading} />
      </div>

      <div>
        <h2 className="pos-section-title mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {navCards.map((card, i) => (
            <Link key={i} to={card.path}
              className="bg-white border border-zinc-200 rounded-xl shadow-sm p-5 hover:border-zinc-200 hover:shadow-sm transition-all duration-200 group flex flex-col">
              <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-500 mb-4 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                {card.icon}
              </div>
              <h3 className="text-base font-semibold text-zinc-900 mb-1">{card.title}</h3>
              <p className="text-sm text-zinc-500 flex-1">{card.desc}</p>
              <div className="flex items-center gap-1 text-zinc-400 group-hover:text-blue-500 text-sm font-medium mt-4 transition-colors">
                <span>Open</span>
                <ChevronRight size={15} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h2 className="pos-section-title mb-4">Recent Transactions</h2>
        <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="pos-table">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Customer ID</th>
                  <th>Total</th>
                  <th className="hidden sm:table-cell">Payment</th>
                  <th className="hidden md:table-cell">Date</th>
                  <th className="text-center">View</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  Array(5).fill(0).map((_, i) => (
                    <tr key={i}>
                      {Array(6).fill(0).map((__, j) => (
                        <td key={j}><div className="h-4 bg-zinc-100 animate-pulse rounded" /></td>
                      ))}
                    </tr>
                  ))
                ) : salesData.length > 0 ? (
                  salesData.slice(0, 8).map(sale => (
                    <tr key={sale.invoice.id}>
                      <td className="font-medium text-zinc-400 text-xs">{sale.invoice.id}</td>
                      <td>{sale.invoice.customerId}</td>
                      <td className="font-semibold text-emerald-600">Rs {sale.invoice.total?.toLocaleString()}</td>
                      <td className="hidden sm:table-cell">{sale.invoice.paymentMethod}</td>
                      <td className="hidden md:table-cell">{fmt(sale.invoice.updatedAt)}</td>
                      <td className="text-center">
                        <button onClick={() => setSelectedSale(sale)}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="6" className="py-10 text-center text-zinc-400">No transactions found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <h2 className="pos-section-title mb-4">Low Stock Alert</h2>
        <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="pos-table">
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Name</th>
                  <th>Stock</th>
                  <th className="hidden sm:table-cell">Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  Array(3).fill(0).map((_, i) => (
                    <tr key={i}>{Array(5).fill(0).map((__, j) => <td key={j}><div className="h-4 bg-zinc-100 animate-pulse rounded" /></td>)}</tr>
                  ))
                ) : productData.filter(p => (p.quantity || 0) < 10).length > 0 ? (
                  productData.filter(p => (p.quantity || 0) < 10).slice(0, 5).map(p => (
                    <tr key={p.id}>
                      <td className="text-xs text-zinc-400 font-medium">{p.id}</td>
                      <td className="font-medium text-zinc-900">{p.name}</td>
                      <td className="font-bold text-red-500">{p.quantity || 0}</td>
                      <td className="hidden sm:table-cell">Rs {(p.price || 0).toLocaleString()}</td>
                      <td><span className="pos-badge-danger">Low Stock</span></td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="5" className="py-10 text-center text-zinc-400">All items are well stocked</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedSale && <SaleModal sale={selectedSale} onClose={() => setSelectedSale(null)} />}

    </div>
  );
}

export default BaseScreenHome;
