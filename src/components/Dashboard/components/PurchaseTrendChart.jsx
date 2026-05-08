
import { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { nivoTheme } from "../../../utils/nivoTheme";

function PurchaseTrendChart({ grnData }) {
  const purchasesByMonth = useMemo(() => processPurchasesByMonth(grnData), [grnData]);

  return (
    <div className="w-full h-full">
      <ResponsiveLine
        data={purchasesByMonth}
        margin={{ top: 20, right: 20, bottom: 40, left: 65 }}
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
          tickSize: 5, tickPadding: 8, tickRotation: 0,
          legend: 'Purchases (Rs)', legendOffset: -45, legendPosition: 'middle',
          format: v =>
            Math.abs(v) >= 1000000 ? `${(v / 1000000).toFixed(1)}M`
            : Math.abs(v) >= 1000  ? `${(v / 1000).toFixed(1)}K`
            : v,
          tickValues: 5,
        }}
        pointSize={8}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        useMesh={true}
        colors={['#4A7FA5']}
        lineWidth={2.5}
        enableArea={true}
        areaOpacity={0.1}
        enableSlices="x"
        curve="monotoneX"
        defs={[{
          id: 'gradientBlue',
          type: 'linearGradient',
          colors: [
            { offset: 0, color: '#4A7FA5', opacity: 0.4 },
            { offset: 100, color: '#4A7FA5', opacity: 0 },
          ],
        }]}
        fill={[{ match: '*', id: 'gradientBlue' }]}
        theme={nivoTheme}
        animate={true}
        motionConfig="gentle"
      />
    </div>
  );
}

function processPurchasesByMonth(grnData) {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const purchaseData = months.map(month => ({ x: month, y: 0 }));

  if (grnData && Array.isArray(grnData) && grnData.length > 0) {
    const currentYear = new Date().getFullYear();
    grnData.forEach(grn => {
      try {
        const date = new Date(grn.updatedAt || grn.createdAt);
        const total = Number(grn.total) || 0;
        if (!isNaN(date.getTime()) && date.getFullYear() === currentYear) {
          purchaseData[date.getMonth()].y += total;
        }
      } catch (e) { /* skip */ }
    });
    purchaseData.forEach(d => { d.y = Number(d.y.toFixed(2)); });
  }

  return [{ id: `Purchases ${new Date().getFullYear()}`, color: '#4A7FA5', data: purchaseData }];
}

export default PurchaseTrendChart;
