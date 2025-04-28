import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { getExpenses } from "../services/expenseService";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = ({ refresh }) => {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const res = await getExpenses();
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, [refresh]);

  // Group data
  const categoryData = expenses.reduce((acc, exp) => {
    const index = acc.findIndex(item => item.name === exp.category);
    if (index >= 0) acc[index].value += exp.amount;
    else acc.push({ name: exp.category, value: exp.amount });
    return acc;
  }, []);

  const monthlyData = expenses.reduce((acc, exp) => {
    const month = new Date(exp.date).toLocaleString('default', { month: 'short' });
    const index = acc.findIndex(item => item.name === month);
    if (index >= 0) acc[index].value += exp.amount;
    else acc.push({ name: month, value: exp.amount });
    return acc;
  }, []);

  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Expense Dashboard</h2>
      
      <div className="flex flex-col items-center gap-12">
        {/* Pie Chart with smooth animation */}
        <PieChart width={400} height={400}>
          <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={150}
            paddingAngle={5}
            dataKey="value"
            isAnimationActive={true}  // ✅ Always animate
            animationDuration={1500}
            animationEasing="ease-out"  // ✅ Smooth easing
            label
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        {/* Bar Chart with smooth animation */}
        <BarChart width={500} height={300} data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="value"
            fill="#8884d8"
            radius={[10, 10, 0, 0]}
            isAnimationActive={true}  // ✅ Always animate
            animationDuration={1500}
            animationEasing="ease-out"
          />
        </BarChart>
      </div>
    </div>
  );
};

export default Dashboard;
