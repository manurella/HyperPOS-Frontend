
import { useState, useEffect } from "react";
import { TrendingUp, ShoppingCart, Users, Package } from "lucide-react";

import SummaryCard from "../components/SummaryCard";
import SalesTrendChart from "../components/SalesTrendChart";
import TopProductsChart from "../components/TopProductsChart";
import RecentInvoices from "../components/RecentInvoices";
import DateRangeSelector from "../components/DateRangeSelector";
import PurchaseTrendChart from "../components/PurchaseTrendChart";
import TopSuppliersChart from "../components/TopSuppliersChart";
import SalesPurchasesComparisonChart from "../components/SalesPurchasesComparisonChart";
import UserActivity from "../components/UserActivity";
import RecentPurchases from "../components/RecentPurchases";
import RevenueGrowthChart from "../components/RevenueGrowthChart";

import { getInvoiceData }  from "../data/invoiceData";
import { getProductData }  from "../data/productData";
import { getCustomerData } from "../data/customerData";
import { getSaleData }     from "../data/salesData";
import { getGRNData }      from "../data/grnData";
import { getPurchaseData } from "../data/purchaseData";
import { getUserData }     from "../data/userData";

import HyperPOSLoader from "../../UI/HyperPOSLoader";

/* -- Reusable section card ----------------------------------- */
function ChartCard({ title, children, className = "" }) {
  return (
    <div
      className={`bg-white border border-[#E8E5DC] rounded-[14px] p-5 sm:p-6 ${className}`}
      style={{ boxShadow: '0 1px 3px rgba(26,25,21,0.06), 0 4px 12px rgba(26,25,21,0.04)' }}
    >
      {title && <h2 className="text-[15px] font-semibold text-[#1A1915] mb-4">{title}</h2>}
      {children}
    </div>
  );
}

/* -- Main component ------------------------------------------ */
function DashboardHome() {

  const [dateRange,    setDateRange]    = useState({ startDate: "", endDate: "" });
  const [customerData, setCustomerData] = useState([]);
  const [productData,  setProductData]  = useState([]);
  const [,             setSaleData]     = useState([]);
  const [invoiceData,  setInvoiceData]  = useState([]);
  const [grnData,      setGRNData]      = useState([]);
  const [,             setPurchaseData] = useState([]);
  const [userData,     setUserData]     = useState([]);
  const [isLoading,    setIsLoading]    = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [customers, products, sales, invoices, grns, purchases, users] = await Promise.all([
          getCustomerData(),
          getProductData(),
          getSaleData(),
          getInvoiceData(),
          getGRNData(),
          getPurchaseData(),
          getUserData(),
        ]);
        setCustomerData(customers || []);
        setProductData(products  || []);
        setSaleData(sales        || []);
        setInvoiceData(invoices  || []);
        setGRNData(grns          || []);
        setPurchaseData(purchases|| []);
        setUserData(users        || []);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  /* -- Date filtering -- */
  const filterByDate = (data, dateKey = "createdAt") => {
    if (!dateRange.startDate || !dateRange.endDate) return data;
    const start = new Date(dateRange.startDate);
    const end   = new Date(dateRange.endDate);
    end.setHours(23, 59, 59);
    return data.filter(item => {
      const d = new Date(item[dateKey] || item.updatedAt);
      return d >= start && d <= end;
    });
  };

  const filteredInvoiceData = filterByDate(invoiceData);
  const filteredGRNData     = filterByDate(grnData);

  const totalSales     = filteredInvoiceData.reduce((s, i) => s + (i.total || 0), 0);
  const totalPurchases = filteredGRNData.reduce((s, i) => s + (i.total || 0), 0);

  return (
    <div className="space-y-6">

      {/* -- Page header -- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-sans text-[30px] font-bold text-[#1A1915] tracking-[-0.02em]">Dashboard</h1>
          <p className="text-[13px] text-[#8C8A82] mt-0.5">Overview of your business performance</p>
        </div>
        <DateRangeSelector
          onRangeChange={(newRange) => setDateRange(newRange)}
          initialStartDate={dateRange.startDate}
          initialEndDate={dateRange.endDate}
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[60vh] bg-white rounded-[14px] border border-[#E8E5DC]"
          style={{ boxShadow: '0 1px 3px rgba(26,25,21,0.06), 0 4px 12px rgba(26,25,21,0.04)' }}>
          <HyperPOSLoader size="lg" text="Loading dashboard data…" />
        </div>
      ) : (
        <>
          {/* -- KPI cards -- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            <SummaryCard
              title="Total Sales"
              value={filteredInvoiceData.length > 0 ? `Rs ${totalSales.toLocaleString()}` : "-"}
              subtitle="From invoices"
              accentColor="#4F7A3F"
              iconColor="#4F7A3F"
              iconBgColor="#E6F0E1"
              icon={<TrendingUp size={20} />}
              isLoading={isLoading}
            />

            <SummaryCard
              title="Total Purchases"
              value={filteredGRNData.length > 0 ? `Rs ${totalPurchases.toLocaleString()}` : "-"}
              subtitle="From GRNs"
              accentColor="#4A7FA5"
              iconColor="#4A7FA5"
              iconBgColor="#E5EFF7"
              icon={<ShoppingCart size={20} />}
              isLoading={isLoading}
            />

            <SummaryCard
              title="Active Customers"
              value={customerData.filter(c => c.isActive !== false).length || "-"}
              subtitle="Registered accounts"
              accentColor="#3D7A5C"
              iconColor="#3D7A5C"
              iconBgColor="#E2F0EA"
              icon={<Users size={20} />}
              isLoading={isLoading}
            />

            <SummaryCard
              title="Active Products"
              value={productData.filter(p => p.isActive !== false).length || "-"}
              subtitle="In inventory"
              accentColor="#B5860D"
              iconColor="#B5860D"
              iconBgColor="#FBF3D5"
              icon={<Package size={20} />}
              isLoading={isLoading}
            />

          </div>

          {/* -- Sales vs Purchases -- */}
          <ChartCard title="Sales vs Purchases">
            <div className="h-64 sm:h-80 lg:h-96">
              <SalesPurchasesComparisonChart
                invoiceData={filteredInvoiceData}
                grnData={filteredGRNData}
                isLoading={isLoading}
              />
            </div>
          </ChartCard>

          {/* -- 2-column charts -- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            <ChartCard title="Sales Trend">
              <div className="h-64 sm:h-72">
                <SalesTrendChart invoiceData={filteredInvoiceData} isLoading={isLoading} />
              </div>
            </ChartCard>

            <ChartCard title="Purchase Trend">
              <div className="h-64 sm:h-72">
                <PurchaseTrendChart grnData={filteredGRNData} isLoading={isLoading} />
              </div>
            </ChartCard>

            <ChartCard title="Top Products">
              <div className="h-64 sm:h-72">
                <TopProductsChart invoiceData={filteredInvoiceData} productData={productData} isLoading={isLoading} />
              </div>
            </ChartCard>

            <ChartCard title="Top Suppliers">
              <div className="h-64 sm:h-72">
                <TopSuppliersChart grnData={filteredGRNData} isLoading={isLoading} />
              </div>
            </ChartCard>

          </div>

          {/* -- User Activity -- */}
          <ChartCard title="User Activity">
            <div className="h-64 sm:h-72">
              <UserActivity userData={userData} invoiceData={filteredInvoiceData} isLoading={isLoading} />
            </div>
          </ChartCard>

          {/* -- Recent tables -- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            <ChartCard title="Recent Sales">
              <div className="overflow-x-auto">
                <RecentInvoices invoiceData={filteredInvoiceData} isLoading={isLoading} />
              </div>
            </ChartCard>

            <ChartCard title="Recent Purchases">
              <div className="overflow-x-auto">
                <RecentPurchases grnData={filteredGRNData} isLoading={isLoading} />
              </div>
            </ChartCard>

          </div>

          {/* -- Revenue Growth -- */}
          <ChartCard title="Revenue Growth">
            <div className="h-64 sm:h-80 lg:h-96">
              <RevenueGrowthChart invoiceData={filteredInvoiceData} isLoading={isLoading} />
            </div>
          </ChartCard>

        </>
      )}

    </div>
  );
}

export default DashboardHome;
