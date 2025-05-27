// hooks/useExpenses.js
import { useState } from 'react';
import axios from 'axios';

function useExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [showing, setShowing] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Fetch expenses
  const fetchExpenses = () => {
    axios.get('http://127.0.0.1:8000/Expdata/')
      .then(response => {
        setExpenses(response.data);
        setShowing(true);
      })
      .catch(error => {
        console.error('Error fetching expenses:', error);
        setShowing(false);
      });
  };

  // Add or Update expense based on editingId
  const addOrUpdateExpense = (e) => {
    e.preventDefault();
    const expenseData = { title, amount, category, date, description };

    if (editingId) {
      updateExpense(editingId, expenseData);
    } else {
      axios.post('http://127.0.0.1:8000/Expdata/', expenseData)
        .then(() => {
          resetForm();
          fetchExpenses();
        })
        .catch(error => {
          console.error('Error adding expense:', error);
        });
    }
  };

  // Update an expense
  const updateExpense = (id, updatedData) => {
    axios.put(`http://127.0.0.1:8000/EArkoData/${id}`, updatedData)
      .then(response => {
        setExpenses(prev => prev.map(exp => (exp.id === id ? response.data : exp)));
        resetForm();
        setEditingId(null);
      })
      .catch(error => {
        console.error('Error updating expense:', error);
      });
  };

  // Delete an expense
  const deleteExpense = (id) => {
    axios.delete(`http://127.0.0.1:8000/EArkoData/${id}`)
      .then(() => {
        setExpenses(prev => prev.filter(exp => exp.id !== id));
      })
      .catch(error => {
        console.error('Error deleting expense:', error);
      });
  };

  // Set form values for editing
  const startEditing = (expense) => {
    setEditingId(expense.id);
    setTitle(expense.title);
    setAmount(expense.amount);
    setCategory(expense.category);
    setDate(expense.date);
    setDescription(expense.description);
  };

  // Reset form
  const resetForm = () => {
    setTitle('');
    setAmount('');
    setCategory('Food');
    setDate('');
    setDescription('');
    setEditingId(null);
  };

  return {
    expenses,
    showing,
    title, setTitle,
    amount, setAmount,
    category, setCategory,
    date, setDate,
    description, setDescription,
    fetchExpenses,
    addOrUpdateExpense,
    deleteExpense,
    startEditing,
    editingId
  };
}

export default useExpenses;
