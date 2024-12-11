import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Hash mật khẩu
  const hashedPassword = await bcrypt.hash('password', 10);

  // Tạo user với mật khẩu đã được hash
  await prisma.user.create({
    data: {
      name: 'User User',
      email: 'user@example.com',
      password: hashedPassword,  
      roles: {
        connect: [{ name: 'USER' }],
      },
    },
  });

  console.log('User created with hashed password');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
