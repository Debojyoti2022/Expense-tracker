import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Dashboard from "./components/Dashboard";
import { addExpense, updateExpense } from "./services/expenseService";

function App() {
  const [editingExpense, setEditingExpense] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleSubmit = async (data) => {
    try {
      if (editingExpense) {
        await updateExpense(editingExpense._id, data);
        setEditingExpense(null);  // Clear after update
      } else {
        await addExpense(data);
      }
      setRefresh(prev => !prev);
    } catch (error) {
      console.error("Error submitting expense:", error.message);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);   // ✅ Set the selected expense
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-300 p-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-6xl w-full">
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-10">Expense Tracker 💸</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-8">
            <ExpenseForm onSubmit={handleSubmit} initialData={editingExpense} />
            <ExpenseList onEdit={handleEdit} refresh={refresh} />
          </div>
          <Dashboard refresh={refresh} />
        </div>
      </div>
    </div>
  );
}

export default App;
