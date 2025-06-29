import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const specialties = [
    { name: "Cardiologia" },
    { name: "Pediatria" },
    { name: "Dermatologia" },
    { name: "Ginecologia" },
    { name: "Neurologia" },
  ];

  for (const specialty of specialties) {
    await prisma.specialties.upsert({
      where: { name: specialty.name },
      update: {},
      create: specialty,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
