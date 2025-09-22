import { useState } from "react";
import { postTransaction } from "../api";

export default function TransactionForm({ onAdded }) {
  const [form, setForm] = useState({ item_name: "", price: 0, quantity: 1, date: "" });

  const submit = async e => {
    e.preventDefault();
    await postTransaction(form);
    setForm({ item_name: "", price: 0, quantity: 1, date: "" });
    onAdded();
  };

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 8 }}>
      <input placeholder="item_name" value={form.item_name} onChange={e => setForm({ ...form, item_name: e.target.value })} required />
      <input type="number" placeholder="Harga" value={form.price} onChange={e => setForm({ ...form, price: +e.target.value })} required />
      <input type="number" placeholder="Jumlah" value={form.quantity} onChange={e => setForm({ ...form, quantity: +e.target.value })} required />
      <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
      <button type="submit">Tambah</button>
    </form>
  );
}
