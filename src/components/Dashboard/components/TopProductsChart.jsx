
import { ResponsiveBar } from "@nivo/bar";
import { nivoTheme } from "../../../utils/nivoTheme";

const CHART_COLORS = ['#4F7A3F', '#3D7A5C', '#4A7FA5', '#B5860D', '#2D4A22'];

function TopProductsChart({ invoiceData, productData }) {
  const topProducts = processTopProducts(invoiceData, productData);

  return (
    <div className="w-full h-full">
      <ResponsiveBar
        data={topProducts}
        keys={['sales']}
        indexBy="name"
        margin={{ top: 20, right: 20, bottom: 60, left: 50 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={({ index }) => CHART_COLORS[index % CHART_COLORS.length]}
        borderRadius={4}
        borderWidth={0}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5, tickPadding: 5, tickRotation: -45,
          legend: 'Product', legendPosition: 'middle', legendOffset: 50,
        }}
        axisLeft={{
          tickSize: 5, tickPadding: 5, tickRotation: 0,
          legend: 'Sales (Rs)', legendPosition: 'middle', legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        enableLabel={false}
        enableGridY={true}
        isInteractive={true}
        theme={nivoTheme}
        animate={true}
        motionConfig="gentle"
      />
    </div>
  );
}

function processTopProducts(invoiceData, productData) {
  if (!invoiceData || invoiceData.length === 0) return [];

  if (invoiceData[0]?.items) {
    const productSalesMap = {};
    invoiceData.forEach(invoice => {
      invoice.items.forEach(item => {
        productSalesMap[item.productId] = (productSalesMap[item.productId] || 0) + item.amount;
      });
    });

    return Object.entries(productSalesMap)
      .map(([productId, sales]) => {
        const product = productData?.find(p => p.id === parseInt(productId));
        let name = product?.name || `Product ${productId}`;
        if (name.length > 15) name = name.substring(0, 12) + '...';
        return { productId: parseInt(productId), name, fullName: product?.name || name, sales };
      })
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);
  }

  if (productData && productData.length > 0) {
    return productData.slice(0, 5).map(product => {
      let name = product.name || `Product ${product.id}`;
      if (name.length > 15) name = name.substring(0, 12) + '...';
      return { productId: product.id, name, fullName: product.name || name, sales: 0 };
    });
  }

  return [];
}

export default TopProductsChart;
