import { Module } from '@nestjs/common';
import { PolicyService } from './policy.service';
import { PolicyController } from './policy.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [PolicyController],
  providers: [PolicyService, PrismaClient],
})
export class PolicyModule {}
