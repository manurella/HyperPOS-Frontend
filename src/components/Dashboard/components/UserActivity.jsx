
import { ResponsiveBar } from "@nivo/bar";
import { nivoTheme } from "../../../utils/nivoTheme";

const CHART_COLORS = ['#4F7A3F', '#3D7A5C', '#4A7FA5', '#B5860D', '#8C8A82'];

function UserActivity({ userData, invoiceData }) {
  const activityData = processUserActivity(userData, invoiceData);

  return (
    <div className="w-full h-full">
      <ResponsiveBar
        data={activityData}
        keys={['invoiceCount']}
        indexBy="userName"
        margin={{ top: 20, right: 20, bottom: 50, left: 40 }}
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
          legend: 'User', legendPosition: 'middle', legendOffset: 40,
        }}
        axisLeft={{
          tickSize: 5, tickPadding: 5, tickRotation: 0,
          legend: 'Invoices', legendPosition: 'middle', legendOffset: -30,
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

function processUserActivity(userData, invoiceData) {
  if (!userData || userData.length === 0 || !invoiceData || invoiceData.length === 0) return [];

  const userInvoiceCounts = {};
  userData.forEach(user => {
    const displayName = user.name || user.username || `User ${user.id}`;
    const shortName = displayName.length > 10 ? displayName.substring(0, 8) + '...' : displayName;
    userInvoiceCounts[user.id] = { userId: user.id, userName: shortName, fullName: displayName, invoiceCount: 0 };
  });

  invoiceData.forEach(invoice => {
    const userId = invoice.userId || invoice.createdBy;
    if (userId && userInvoiceCounts[userId]) {
      userInvoiceCounts[userId].invoiceCount += 1;
    }
  });

  return Object.values(userInvoiceCounts)
    .sort((a, b) => b.invoiceCount - a.invoiceCount)
    .slice(0, 5);
}

export default UserActivity;
