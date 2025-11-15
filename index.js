const express = require("express");
const prisma = require("./db");
const client = require('prom-client');
const app = express();

app.use(express.json());

// ------- Prometheus metrics setup -------
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'statusCode'],
});

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'statusCode'],
  buckets: [0.005, 0.01, 0.05, 0.1, 0.3, 0.5, 1, 2, 5],
});

app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer();
  res.on('finish', () => {
    const route = req.route && req.route.path ? req.route.path : req.path;
    httpRequestCounter.labels(req.method, route, String(res.statusCode)).inc();
    end({ method: req.method, route, statusCode: res.statusCode });
  });
  next();
});


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

app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } catch (ex) {
    res.status(500).end(ex);
  }
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
