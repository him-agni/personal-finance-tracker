import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  getTransactions,
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from "../utils/api.transaction";
import { useNavigate } from "react-router-dom";
import ChartSection from "../components/ChartSection";

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({ title: "", amount: "", type: "income" });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", amount: "", type: "" });

  const [budgetLimit, setBudgetLimit] = useState(10000); // Default: ₹10,000

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch transactions on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTransactions(user.token);
        setTransactions(data);
      } catch (err) {
        alert("Failed to fetch transactions");
      }
    };
    fetchData();
  }, [user]);

  if (!user) return null;

  // Submit new transaction
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTx = await createTransaction(form, user.token);
      setTransactions([...transactions, newTx]);
      setForm({ title: "", amount: "", type: "income" });
    } catch (err) {
      alert("Failed to add transaction");
    }
  };

  const handleEditClick = (tx) => {
    setEditId(tx._id);
    setEditForm({ title: tx.title, amount: tx.amount, type: tx.type });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (id) => {
    try {
      const updated = await updateTransaction(id, editForm, user.token);
      setTransactions(transactions.map((tx) => (tx._id === id ? updated : tx)));
      setEditId(null);
    } catch (err) {
      alert("Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteTransaction(id, user.token);
      setTransactions(transactions.filter((tx) => tx._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  const incomeTotal = transactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const expenseTotal = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const balance = incomeTotal - expenseTotal;

  // Filtered list
  const filteredTxs = transactions.filter((tx) =>
    filter === "all" ? true : tx.type === filter,
  );

  const monthlyExpense = transactions
    .filter((tx) => {
      const txDate = new Date(tx.date);
      return (
        tx.type === "expense" &&
        txDate.getMonth() === currentMonth &&
        txDate.getFullYear() === currentYear
      );
    })
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px" }}>
      {monthlyExpense > budgetLimit && (
        <div className="alert-box">
          🚨 You’ve exceeded your monthly budget of ₹{budgetLimit}!
        </div>
      )}

      <header className="flex-between" style={{ marginBottom: "20px" }}>
        <h2>Welcome, {user.name}</h2>
        <button className="danger" onClick={logout}>Logout</button>
      </header>

      <div className="glass-panel" style={{ marginBottom: "20px" }}>
        <div className="flex-between">
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "var(--text-muted)" }}>Set Monthly Budget</label>
            <div className="flex-gap">
               <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>₹</span>
               <input
                 type="number"
                 value={budgetLimit}
                 onChange={(e) => setBudgetLimit(Number(e.target.value))}
                 style={{ width: "150px" }}
               />
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
             <h3 style={{ margin: "0 0 8px 0", color: "var(--text-muted)" }}>Summary</h3>
             <div className="flex-gap" style={{ justifyContent: "flex-end", fontSize: "0.9rem" }}>
                <span className="tx-income-indicator">+₹{incomeTotal}</span>
                <span className="tx-expense-indicator">-₹{expenseTotal}</span>
             </div>
             <p style={{ margin: "8px 0 0 0", fontSize: "1.2rem", fontWeight: "bold", color: balance >= 0 ? "var(--primary-color)" : "var(--danger-color)" }}>Net: ₹{balance}</p>
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ marginBottom: "20px" }}>
        <h3 style={{ marginTop: 0, marginBottom: "16px" }}>Add Transaction</h3>
        <form onSubmit={handleSubmit} className="flex-gap" style={{ flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 200px" }}>
            <input
              name="title"
              placeholder="Transaction title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div style={{ flex: "1 1 120px" }}>
            <input
              name="amount"
              type="number"
              placeholder="Amount"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              required
            />
          </div>
          <div style={{ flex: "1 1 120px" }}>
            <select
              name="type"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <button type="submit" style={{ flex: "0 0 auto" }}>Add</button>
        </form>
      </div>

      <div className="glass-panel" style={{ marginBottom: "20px" }}>
         <div className="flex-between" style={{ marginBottom: "16px" }}>
            <h3 style={{ margin: 0 }}>Recent Transactions</h3>
            <div className="flex-gap">
               <label style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Filter:</label>
               <select onChange={(e) => setFilter(e.target.value)} value={filter} style={{ width: "auto", padding: "8px 12px" }}>
                 <option value="all">All</option>
                 <option value="income">Income</option>
                 <option value="expense">Expense</option>
               </select>
            </div>
         </div>
         <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {filteredTxs.length === 0 && (
               <li style={{ textAlign: "center", color: "var(--text-muted)", padding: "20px 0" }}>No transactions found.</li>
            )}
            {filteredTxs.map((tx) => (
               <li key={tx._id} className="transaction-row">
                 {editId === tx._id ? (
                   <div className="flex-gap" style={{ width: "100%", flexWrap: "wrap" }}>
                     <input
                       name="title"
                       value={editForm.title}
                       onChange={handleEditChange}
                       style={{ flex: "1 1 150px" }}
                     />
                     <input
                       name="amount"
                       type="number"
                       value={editForm.amount}
                       onChange={handleEditChange}
                       style={{ flex: "1 1 100px" }}
                     />
                     <select
                       name="type"
                       value={editForm.type}
                       onChange={handleEditChange}
                       style={{ flex: "1 1 100px" }}
                     >
                       <option value="income">Income</option>
                       <option value="expense">Expense</option>
                     </select>
                     <div className="flex-gap" style={{ flex: "0 0 auto" }}>
                        <button onClick={() => handleUpdate(tx._id)}>Save</button>
                        <button className="secondary" onClick={() => setEditId(null)}>Cancel</button>
                     </div>
                   </div>
                 ) : (
                   <>
                     <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1" }}>
                        <strong style={{ fontSize: "1.05rem" }}>{tx.title}</strong>
                        <span className={tx.type === "income" ? "tx-income-indicator" : "tx-expense-indicator"}>
                           {tx.type === "income" ? "+" : "-"}₹{tx.amount}
                        </span>
                     </div>
                     <div className="flex-gap">
                        <button className="secondary" onClick={() => handleEditClick(tx)}>Edit</button>
                        <button className="danger" onClick={() => handleDelete(tx._id)}>Delete</button>
                     </div>
                   </>
                 )}
               </li>
            ))}
         </ul>
      </div>

      <ChartSection transactions={transactions} />
    </div>
  );
}
