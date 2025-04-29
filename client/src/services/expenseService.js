import axios from "axios";

const API_URL = "https://expense-tracker-duih.onrender.com/expenses";

export const getExpenses = () => axios.get(API_URL);
export const addExpense = (data) => axios.post(API_URL, data);
export const updateExpense = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteExpense = (id) => axios.delete(`${API_URL}/${id}`);
