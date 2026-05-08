
import { ResponsiveBar } from "@nivo/bar";
import { nivoTheme } from "../../../utils/nivoTheme";

function SalesPurchasesComparisonChart({ invoiceData, grnData }) {
  const comparisonData = processComparisonData(invoiceData, grnData);

  return (
    <div className="w-full h-full">
      <ResponsiveBar
        data={comparisonData}
        keys={['sales', 'purchases']}
        indexBy="month"
        margin={{ top: 30, right: 100, bottom: 50, left: 65 }}
        padding={0.3}
        groupMode="grouped"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={({ id }) => id === 'sales' ? '#4F7A3F' : '#4A7FA5'}
        borderRadius={4}
        borderWidth={0}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5, tickPadding: 5, tickRotation: 0,
          legend: 'Month', legendPosition: 'middle', legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5, tickPadding: 8, tickRotation: 0,
          legend: 'Amount (Rs)', legendPosition: 'middle', legendOffset: -55,
          format: v =>
            Math.abs(v) >= 1000000 ? `${(v / 1000000).toFixed(1)}M`
            : Math.abs(v) >= 1000  ? `${(v / 1000).toFixed(1)}K`
            : v,
          tickValues: 5,
        }}
        enableGridY={true}
        enableLabel={false}
        legends={[{
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 90,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 80,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 12,
          symbolShape: 'circle',
          effects: [{ on: 'hover', style: { itemOpacity: 1 } }],
        }]}
        theme={nivoTheme}
        animate={true}
        motionConfig="gentle"
      />
    </div>
  );
}

function processComparisonData(invoiceData, grnData) {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const comparisonData = months.map(month => ({ month, sales: 0, purchases: 0 }));

  const currentYear = new Date().getFullYear();

  if (invoiceData && invoiceData.length > 0) {
    invoiceData.forEach(invoice => {
      try {
        const date = new Date(invoice.updatedAt || invoice.createdAt);
        const total = Number(invoice.total) || 0;
        if (!isNaN(date.getTime()) && date.getFullYear() === currentYear) {
          comparisonData[date.getMonth()].sales += total;
        }
      } catch (e) { /* skip */ }
    });
  }

  if (grnData && grnData.length > 0) {
    grnData.forEach(grn => {
      try {
        const date = new Date(grn.updatedAt || grn.createdAt);
        const total = Number(grn.total) || 0;
        if (!isNaN(date.getTime()) && date.getFullYear() === currentYear) {
          comparisonData[date.getMonth()].purchases += total;
        }
      } catch (e) { /* skip */ }
    });
  }

  comparisonData.forEach(d => {
    d.sales     = Number(d.sales.toFixed(2));
    d.purchases = Number(d.purchases.toFixed(2));
  });

  return comparisonData;
}

export default SalesPurchasesComparisonChart;
