import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Seed Fixed Prices
  console.log('📊 Creating fixed prices...');
  const fixedPrices = [
    { id: 'agua', value: 150.0 },
    { id: 'luz', value: 300.0 },
    { id: 'internet', value: 100.0 },
    { id: 'salario', value: 2500.0 },
    { id: 'pro_labore', value: 1500.0 },
  ];

  for (const price of fixedPrices) {
    await prisma.fixedPrice.upsert({
      where: { id: price.id },
      update: { value: price.value },
      create: price,
    });
  }

  // Seed Sales Volume
  console.log('📈 Creating sales volume...');
  await prisma.salesVolume.upsert({
    where: { id: 'current' },
    update: { volume: 100 },
    create: {
      id: 'current',
      volume: 100,
    },
  });

  // Seed Token
  console.log('🔑 Creating token...');
  await prisma.token.upsert({
    where: { id: 'current' },
    update: { token: null },
    create: {
      id: 'current',
      token: null,
    },
  });

  // Seed Sample Ingredients
  console.log('🥬 Creating sample ingredients...');
  const sampleIngredients = [
    {
      nome: 'Arroz Japonês',
      categoria: 'graos_cereais',
      unidade_medida: 'kg',
      quantidade_total: 25,
      custo_total: 180.5,
      custo_por_unidade: 7.22,
      fornecedor: 'Fornecedor A',
      descricao: 'Arroz especial para sushi',
    },
    {
      nome: 'Salmão Fresco',
      categoria: 'peixes',
      unidade_medida: 'kg',
      quantidade_total: 5,
      custo_total: 250.0,
      custo_por_unidade: 50.0,
      fornecedor: 'Peixaria Central',
      descricao: 'Salmão fresco para sashimi',
    },
    {
      nome: 'Nori',
      categoria: 'algas',
      unidade_medida: 'folhas',
      quantidade_total: 100,
      custo_total: 45.0,
      custo_por_unidade: 0.45,
      fornecedor: 'Importadora Japonesa',
      descricao: 'Alga nori para sushi',
    },
  ];

  for (const ingredient of sampleIngredients) {
    await prisma.ingredient.create({
      data: ingredient,
    });
  }

  // Seed Sample Menu Items
  console.log('🍣 Creating sample menu items...');
  const ingredients = await prisma.ingredient.findMany();

  if (ingredients.length > 0) {
    await prisma.menuItem.create({
      data: {
        nome: 'Sushi de Salmão',
        descricao: 'Sushi tradicional de salmão',
        margem_lucro: 0.4,
        ingredientes: [
          { id: ingredients[0].id, quantidade: 0.05 },
          { id: ingredients[1].id, quantidade: 0.03 },
          { id: ingredients[2].id, quantidade: 1 },
        ],
        total_ingredientes: 2.5,
        total_com_precos_fixos: 3.0,
        total_ifood: 3.5,
        total_goomer: 3.3,
        tipo: 'individual',
        preco_final_ifood: 4.9,
        preco_final_goomer: 4.62,
      },
    });
  }

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
