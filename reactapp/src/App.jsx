import useExpenses from './hooks/useExpenses';

function App() {
  const {
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
    editingId,
  } = useExpenses();

  return (
    <div style={{ padding: '20px' }}>
      <h2>💸 Expense Tracker</h2>

      {/* Form */}
      <form onSubmit={addOrUpdateExpense} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Utilities">Utilities</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">
          {editingId ? 'Update Expense' : 'Add Expense'}
        </button>
      </form>

      <button onClick={fetchExpenses}>Show Expenses</button>

      {showing && expenses.length > 0 ? (
        <ul>
          {expenses.map((exp) => (
            <li key={exp.id}>
               {exp.title} - Rs. {exp.amount} ({exp.category}) on {exp.date}
              <br />
              <i>{exp.description}</i>
              <br />
              <button onClick={() => deleteExpense(exp.id)}> Delete</button>
              <button onClick={() => startEditing(exp)}>✏️ Edit</button>
            </li>
          ))}
        </ul>
      ) : showing ? (
        <p>No expenses found.</p>
      ) : null}
    </div>
  );
}

export default App;
