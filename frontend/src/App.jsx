import { useEffect, useState } from "react";
import { fetchTransactions, fetchStats } from "./api";
import TransactionForm from "./components/TransactionForm";
import TransactionTable from "./components/TransactionTable";
import TransactionChart from "./components/TransactionChart";

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({});

  const load = async () => {
    setTransactions(await fetchTransactions());
    setStats(await fetchStats());
  };

  useEffect(() => { load(); }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Aplikasi Pencatatan Transaksi UMKM</h1>
      <TransactionForm onAdded={load} />
      <h3>Ringkasan</h3>
      <div>Omzet: {stats.total_omzet}</div>
      <div>Jumlah item_name: {stats.total_quantity}</div>
      <div>Rata-rata Harga: {stats.avg_price}</div>
      <h3>Grafik</h3>
      <TransactionChart transactions={transactions} />
      <h3>Daftar Transaksi</h3>
      <TransactionTable transactions={transactions} onChange={load} />
    </div>
  );
}
