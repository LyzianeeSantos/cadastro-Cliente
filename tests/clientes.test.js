const request = require("supertest");
const express = require("express");
const prisma = require("../db");
const app = express();
app.use(express.json());

// Importar rotas do index.js
app.post("/clientes", async (req, res) => {
  const { nome, email, telefone } = req.body;
  try {
    const cliente = await prisma.cliente.create({ data: { nome, email, telefone } });
    res.status(201).json(cliente);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

describe("API de clientes", () => {
  let clienteId;

  it("Deve criar um cliente", async () => {
    const res = await request(app)
      .post("/clientes")
      .send({ nome: "Lyziane", email: "lyziane@email.com", telefone: "123456789" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    clienteId = res.body.id;
  });

  afterAll(async () => {
    // Limpar dados
    await prisma.cliente.deleteMany();
    await prisma.$disconnect();
  });
});
