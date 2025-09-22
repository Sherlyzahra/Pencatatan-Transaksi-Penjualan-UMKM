import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function TransactionChart({ transactions }) {
  const map = {};
  transactions.forEach(t => {
    const omzet = t.price * t.quantity;
    map[t.date] = (map[t.date] || 0) + omzet;
  });

  const labels = Object.keys(map).sort();
  const data = labels.map(l => map[l]);

  return (
    <Line data={{ labels, datasets: [{ label: "Omzet Harian", data, borderColor: "blue" }] }} />
  );
}
