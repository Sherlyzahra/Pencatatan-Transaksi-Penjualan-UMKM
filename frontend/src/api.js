const BASE = "http://localhost:5000";

export async function fetchTransactions() {
  const res = await fetch(`${BASE}/transactions`);
  return res.json();
}

export async function postTransaction(data) {
  const res = await fetch(`${BASE}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteTransaction(id) {
  const res = await fetch(`${BASE}/transactions/${id}`, { method: "DELETE" });
  return res.json();
}

export async function fetchStats() {
  const res = await fetch(`${BASE}/stats`);
  return res.json();
}

export async function updateTransaction(id, data) {
  const res = await fetch(`${BASE}/transactions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}