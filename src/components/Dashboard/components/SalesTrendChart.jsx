
import { ResponsiveLine } from "@nivo/line";
import { nivoTheme } from "../../../utils/nivoTheme";

function SalesTrendChart({ invoiceData }) {
  const salesByMonth = processSalesByMonth(invoiceData);

  return (
    <div className="w-full h-full">
      <ResponsiveLine
        data={salesByMonth}
        margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5, tickPadding: 5, tickRotation: 0,
          legend: 'Month', legendOffset: 30, legendPosition: 'middle',
        }}
        axisLeft={{
          tickSize: 5, tickPadding: 5, tickRotation: 0,
          legend: 'Sales (Rs)', legendOffset: -40, legendPosition: 'middle',
        }}
        pointSize={8}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        colors={['#4F7A3F']}
        lineWidth={2.5}
        enableArea={true}
        areaOpacity={0.1}
        enableSlices="x"
        curve="monotoneX"
        defs={[{
          id: 'gradientGreen',
          type: 'linearGradient',
          colors: [
            { offset: 0, color: '#4F7A3F', opacity: 0.4 },
            { offset: 100, color: '#4F7A3F', opacity: 0 },
          ],
        }]}
        fill={[{ match: '*', id: 'gradientGreen' }]}
        theme={nivoTheme}
        animate={true}
        motionConfig="gentle"
      />
    </div>
  );
}

function processSalesByMonth(invoiceData) {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const salesData = months.map(month => ({ x: month, y: 0 }));

  if (invoiceData && invoiceData.length > 0) {
    const currentYear = new Date().getFullYear();
    invoiceData.forEach(invoice => {
      try {
        const date = new Date(invoice.updatedAt || invoice.createdAt);
        const total = Number(invoice.total) || 0;
        if (!isNaN(date.getTime()) && date.getFullYear() === currentYear) {
          salesData[date.getMonth()].y += total;
        }
      } catch (e) { /* skip */ }
    });
    salesData.forEach(d => { d.y = Number(d.y.toFixed(2)); });
  }

  return [{ id: `Sales ${new Date().getFullYear()}`, color: '#4F7A3F', data: salesData }];
}

export default SalesTrendChart;
