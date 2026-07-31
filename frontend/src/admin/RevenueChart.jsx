import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const RevenueChart = ({ data }) => {
  console.log("REVENUE DATA:", data);

  return (
    <div
      style={{
        width: "100%",
        height: "450px",
        background: "white",
        marginTop: "30px",
        padding: "20px",
      }}
    >
      <h2>Revenue Analytics</h2>

      <ResponsiveContainer width="100%" height="350">
        <LineChart data={data}>
          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line dataKey="revenue" stroke="blue" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
