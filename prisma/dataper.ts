import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Tạo Permission
  const permissions = await prisma.permission.createMany({
    data: [
      { name: 'VIEW_USERS', description: 'View all users' },
      { name: 'EDIT_USERS', description: 'Edit users' },
      { name: 'DELETE_USERS', description: 'Delete users' },
      { name: 'CREATE_PRODUCTS', description: 'Create products' },
    ],
  });

  console.log(`Created ${permissions.count} permissions`);

  // Lấy ID của Permissions vừa tạo
  const createdPermissions = await prisma.permission.findMany();


  // Tạo Role
  const adminRole = await prisma.role.create({
    data: {
      name: 'ADMIN',
      description: 'Administrator role with all permissions',
      permissions: {
        connect: createdPermissions.map((permission) => ({ id: permission.id })),
      },
    },
  });

  console.log(`Created Role: ${adminRole.name}`);

  const userRole = await prisma.role.create({
    data: {
      name: 'USER',
      description: 'Regular user role with basic permissions',
      permissions: {
        connect: [
          { id: createdPermissions.find((p) => p.name === 'VIEW_USERS')?.id },
        ],
      },
    },
  });

  console.log(`Created Role: ${userRole.name}`);
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
