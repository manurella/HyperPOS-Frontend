
import { ResponsivePie } from "@nivo/pie";
import { nivoTheme } from "../../../utils/nivoTheme";

const CHART_COLORS = ['#4F7A3F', '#3D7A5C', '#4A7FA5', '#B5860D', '#8C8A82'];

function TopSuppliersChart({ grnData }) {
  const topSuppliers = processTopSuppliers(grnData);

  return (
    <div className="w-full h-full">
      <ResponsivePie
        data={topSuppliers}
        margin={{ top: 20, right: 20, bottom: 40, left: 20 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#5C5A54"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        colors={CHART_COLORS}
        theme={nivoTheme}
        animate={true}
        motionConfig="gentle"
        legends={[{
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: 30,
          itemsSpacing: 0,
          itemWidth: 60,
          itemHeight: 18,
          itemTextColor: '#5C5A54',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 12,
          symbolShape: 'circle',
          effects: [{ on: 'hover', style: { itemTextColor: '#1A1915' } }],
        }]}
        arcLinkLabel={datum => {
          const isSmallScreen = window.innerWidth < 640;
          if (isSmallScreen) {
            const match = datum.id.match(/Supplier (\d+)/);
            return match ? `S${match[1]}` : datum.id;
          }
          return datum.id;
        }}
        enableArcLabels={window.innerWidth >= 480}
        arcLinkLabelsOffset={window.innerWidth < 640 ? 1 : 2}
        arcLinkLabelsDiagonalLength={window.innerWidth < 640 ? 8 : 16}
        arcLinkLabelsStraightLength={window.innerWidth < 640 ? 8 : 24}
      />
    </div>
  );
}

function processTopSuppliers(grnData) {
  if (!grnData || grnData.length === 0) {
    return [{ id: 'No Data', label: 'No Data', value: 1 }];
  }

  const supplierTotals = {};
  grnData.forEach(grn => {
    const supplierId = grn.supplierId || 'Unknown';
    supplierTotals[supplierId] = (supplierTotals[supplierId] || 0) + (grn.total || 0);
  });

  return Object.entries(supplierTotals)
    .map(([supplierId, value]) => ({
      id: `Supplier ${supplierId}`,
      label: `Supplier ${supplierId}`,
      value,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
}

export default TopSuppliersChart;
