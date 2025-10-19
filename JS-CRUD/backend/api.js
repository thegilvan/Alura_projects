const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const DB_PATH = "./db.json";

// GET todos os pensamentos
app.get("/pensamentos", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_PATH));
  res.json(data.pensamentos);
});

// POST novo pensamento
app.post("/pensamentos", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_PATH));
  const novoPensamento = req.body;
  novoPensamento.id = Math.random().toString(16).slice(2, 6); // gera ID simples
  data.pensamentos.push(novoPensamento);
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  res.status(201).json(novoPensamento);
});

// DELETE pensamento por ID
app.delete("/pensamentos/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_PATH));
  const id = req.params.id;
  data.pensamentos = data.pensamentos.filter((p) => p.id !== id);
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
