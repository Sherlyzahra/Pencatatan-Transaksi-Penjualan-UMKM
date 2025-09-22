import express from "express";
import cors from "cors";
import { initDB } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

let db;
initDB().then((database) => {
  db = database;
  console.log("Database connected");
});

app.use((req, res, next) => {
  if (!db) {
    return res.status(503).json({ error: "Database not initialized yet" });
  }
  next();
});


app.post("/transactions", async (req, res) => {
  try {
    const { item_name, price, quantity, date } = req.body;

    if (!item_name || !price || !quantity || !date) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const [result] = await db.execute(
      "INSERT INTO transactions (item_name, price, quantity, date) VALUES (?, ?, ?, ?)",
      [item_name, price, quantity, date]
    );

    res.json({
      id: result.insertId,
      item_name,
      price,
      quantity,
      date,
    });
  } catch (err) {
    console.error("Error inserting transaction:", err);
    res.status(500).json({ error: "Failed to insert transaction" });
  }
});

app.get("/transactions", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM transactions");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

app.get("/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.execute("SELECT * FROM transactions WHERE id = ?", [
      id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch transaction" });
  }
});

app.put("/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { item_name, price, quantity, date } = req.body;

    const [result] = await db.execute(
      "UPDATE transactions SET item_name = ?, price = ?, quantity = ?, date = ? WHERE id = ?",
      [item_name, price, quantity, date, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    const [rows] = await db.execute("SELECT * FROM transactions WHERE id = ?", [
      id,
    ]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update transaction" });
  }
});

app.delete("/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.execute("DELETE FROM transactions WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete transaction" });
  }
});

app.get("/stats", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM transactions");

    const omzet = rows.reduce((sum, t) => sum + t.price * t.quantity, 0);
    const totalQty = rows.reduce((sum, t) => sum + t.quantity, 0);
    const avgPrice = totalQty ? omzet / totalQty : 0;

    res.json({
      total_omzet: omzet,
      total_quantity: totalQty,
      avg_price: avgPrice,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to calculate stats" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
