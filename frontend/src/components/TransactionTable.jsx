import { deleteTransaction, updateTransaction } from "../api";

export default function TransactionTable({ transactions, onChange }) {
  const remove = async id => {
    await deleteTransaction(id);
    onChange();
  };

  const edit = id => {
    const item = transactions.find(t => t.id === id);
    const newName = prompt("Edit nama item:", item.item_name);
    const newPrice = prompt("Edit harga:", item.price);
    const newQuantity = prompt("Edit jumlah:", item.quantity);
    const newDate = prompt("Edit tanggal:", item.date);

    if (newName && newPrice && newQuantity && newDate) {
      fetch(`http://localhost:5000/transactions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item_name: newName,
          price: Number(newPrice),
          quantity: Number(newQuantity),
          date: newDate
        })
      }).then(() => onChange());
    }
  };


  return (
    <table border="1" cellPadding="6">
      <thead>
        <tr>
          <th>ID</th>
          <th>item_name</th>
          <th>Harga</th>
          <th>Jumlah</th>
          <th>Tanggal</th>
          <th>Aksi</th>
          <th>Edit</th> {/* Tambahkan kolom Edit */}
        </tr>
      </thead>
      <tbody>
        {transactions.map(t => (
          <tr key={t.id}>
            <td>{t.id}</td>
            <td>{t.item_name}</td>
            <td>{t.price}</td>
            <td>{t.quantity}</td>
            <td>{t.date}</td>
            <td>
              <button onClick={() => remove(t.id)}>Hapus</button>
            </td>
            <td>
              <button onClick={() => edit(t.id)}>Edit</button> {/* Tombol Edit */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
