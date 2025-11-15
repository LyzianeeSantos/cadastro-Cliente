const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const clientes = [
    { nome: "Ana Silva", email: "ana.silva@example.com", telefone: "11987654321" },
    { nome: "Bruno Costa", email: "bruno.costa@example.com", telefone: "11988887777" },
    { nome: "Carla Souza", email: "carla.souza@example.com", telefone: "21999998888" },
    { nome: "Diego Santos", email: "diego.santos@example.com", telefone: "31977776666" },
    { nome: "Eduarda Lima", email: "eduarda.lima@example.com", telefone: "71966665555" },
    { nome: "Fernando Rocha", email: "fernando.rocha@example.com", telefone: "81944445555" },
    { nome: "Gabriela Mendes", email: "gabriela.mendes@example.com", telefone: "11922223333" },
    { nome: "Henrique Alves", email: "henrique.alves@example.com", telefone: "12911112222" },
    { nome: "Isabela Torres", email: "isabela.torres@example.com", telefone: "21912345678" },
    { nome: "João Pedro", email: "joao.pedro@example.com", telefone: "31923456789" },
    { nome: "Karen Freitas", email: "karen.freitas@example.com", telefone: "71934567890" },
    { nome: "Lucas Vieira", email: "lucas.vieira@example.com", telefone: "81945678901" },
    { nome: "Mariana Dias", email: "mariana.dias@example.com", telefone: "11956789012" },
    { nome: "Nicolas Rocha", email: "nicolas.rocha@example.com", telefone: "12967890123" },
    { nome: "Olivia Martins", email: "olivia.martins@example.com", telefone: "21978901234" },
    { nome: "Paulo Henrique", email: "paulo.henrique@example.com", telefone: "31989012345" },
    { nome: "Quésia Ramos", email: "quesia.ramos@example.com", telefone: "71990123456" },
    { nome: "Ricardo Gomes", email: "ricardo.gomes@example.com", telefone: "81901234567" },
    { nome: "Sabrina Lopes", email: "sabrina.lopes@example.com", telefone: "11902345678" },
    { nome: "Thiago Monteiro", email: "thiago.monteiro@example.com", telefone: "12903456789" }
  ];

  for (const cliente of clientes) {
    await prisma.cliente.create({ data: cliente });
  }

  console.log("Seed executado com sucesso: 20 clientes criados!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
