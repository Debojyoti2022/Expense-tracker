import { useEffect, useState } from "react";
import { getExpenses, deleteExpense } from "../services/expenseService";

const ExpenseList = ({ onEdit, refresh }) => {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const res = await getExpenses();
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, [refresh]);

  const handleDelete = async (id) => {
    await deleteExpense(id);
    fetchExpenses();
  };

  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">All Expenses</h2>
      <ul className="space-y-6">
        {expenses.map((expense) => (
          <li key={expense._id} className="p-4 bg-white rounded-md shadow flex justify-between items-center">
            <div>
              <p><strong>Amount:</strong> ₹{expense.amount}</p>
              <p><strong>Category:</strong> {expense.category}</p>
              <p><strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}</p>
              <p><strong>Description:</strong> {expense.description}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => onEdit(expense)}  // ✅ Call onEdit with that expense
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(expense._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
