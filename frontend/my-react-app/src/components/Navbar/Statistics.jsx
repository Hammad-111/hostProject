import { FaChartBar } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { BarChart, Bar, AreaChart, Area, PieChart, Pie } from "recharts";

const Statistics = () => {
    const demoData = [
        { month: "Jan", usage: 300 },
        { month: "Feb", usage: 280 },
        { month: "Mar", usage: 320 },
        { month: "Apr", usage: 250 },
      ];
return (
<div className="statistics-section">
            <FaChartBar className="stats-icon" />
            <h2>Usage Statistics</h2>
            <p>Monitor your electricity usage over time.</p>

            {/* Graphs Container */}
            <div className="graph-container">
              {/* Line Chart */}
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={demoData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid stroke="#ccc" />
                  <Line type="monotone" dataKey="usage" stroke="#4fc3f7" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>

              {/* Bar Chart */}
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={demoData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid stroke="#ccc" />
                  <Bar dataKey="usage" fill="#ff7043" />
                </BarChart>
              </ResponsiveContainer>

              {/* Area Chart */}
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={demoData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid stroke="#ccc" />
                  <Area type="monotone" dataKey="usage" fill="#81c784" stroke="#388e3c" />
                </AreaChart>
              </ResponsiveContainer>

              {/* Pie Chart */}
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={demoData} dataKey="usage" nameKey="month" cx="50%" cy="50%" outerRadius={80} fill="#ffca28" label />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
)
}
export default Statistics;