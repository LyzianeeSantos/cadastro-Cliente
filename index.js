const express = require("express");
const prisma = require("./db");
const app = express();

app.use(express.json());

// Criar cliente
app.post("/clientes", async (req, res) => {
  const { nome, email, telefone } = req.body;
  try {
    const cliente = await prisma.cliente.create({
      data: { nome, email, telefone },
    });
    res.status(201).json(cliente);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar clientes
app.get("/clientes", async (req, res) => {
  const clientes = await prisma.cliente.findMany();
  res.json(clientes);
});

// Buscar cliente por id
app.get("/clientes/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const cliente = await prisma.cliente.findUnique({ where: { id } });
  if (!cliente) return res.status(404).json({ error: "Cliente não encontrado" });
  res.json(cliente);
});

// Atualizar cliente
app.put("/clientes/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, email, telefone } = req.body;
  try {
    const cliente = await prisma.cliente.update({
      where: { id },
      data: { nome, email, telefone },
    });
    res.json(cliente);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Deletar cliente
app.delete("/clientes/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.cliente.delete({ where: { id } });
    res.json({ message: "Cliente deletado com sucesso" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
