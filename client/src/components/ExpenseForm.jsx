import { useState, useEffect } from "react";

const ExpenseForm = ({ onSubmit, initialData }) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (initialData) {
      setAmount(initialData.amount || "");
      setCategory(initialData.category || "");
      setDescription(initialData.description || "");
      setDate(initialData.date ? initialData.date.substring(0, 10) : ""); // format date for input
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ amount, category, description, date });
    setAmount("");
    setCategory("");
    setDescription("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-gray-50 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">{initialData ? "Edit Expense" : "Add Expense"}</h2>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded font-semibold">
        {initialData ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default ExpenseForm;
