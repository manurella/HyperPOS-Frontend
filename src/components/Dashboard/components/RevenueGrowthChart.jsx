
import { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { nivoTheme } from "../../../utils/nivoTheme";

function RevenueGrowthChart({ invoiceData }) {
  const revenueGrowthData = useMemo(() => processRevenueGrowth(invoiceData), [invoiceData]);

  return (
    <div className="w-full h-full">
      <ResponsiveLine
        data={revenueGrowthData}
        margin={{ top: 20, right: 20, bottom: 40, left: 65 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5, tickPadding: 5, tickRotation: 0,
          legend: 'Week', legendOffset: 30, legendPosition: 'middle',
        }}
        axisLeft={{
          tickSize: 5, tickPadding: 8, tickRotation: 0,
          legend: 'Revenue (Rs)', legendOffset: -45, legendPosition: 'middle',
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

function processRevenueGrowth(invoiceData) {
  if (!invoiceData || !Array.isArray(invoiceData) || invoiceData.length === 0) {
    return [{ id: 'Weekly Revenue', color: '#4F7A3F', data: [] }];
  }

  const currentDate = new Date();
  const startDate = new Date();
  startDate.setDate(currentDate.getDate() - 56); // 8 weeks back

  const weeklyData = Array(8).fill(null).map((_, i) => {
    const weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + i * 7);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    return { week: `W${i + 1}`, start: weekStart, end: weekEnd, revenue: 0 };
  });

  invoiceData.forEach(invoice => {
    try {
      const date = new Date(invoice.updatedAt || invoice.createdAt);
      const total = Number(invoice.total) || 0;
      if (!isNaN(date.getTime())) {
        for (let i = 0; i < weeklyData.length; i++) {
          if (date >= weeklyData[i].start && date <= weeklyData[i].end) {
            weeklyData[i].revenue += total;
            break;
          }
        }
      }
    } catch (e) { /* skip */ }
  });

  return [{
    id: 'Weekly Revenue',
    color: '#4F7A3F',
    data: weeklyData.map(w => ({ x: w.week, y: Number(w.revenue.toFixed(2)) })),
  }];
}

export default RevenueGrowthChart;
