import { Module } from '@nestjs/common';
import { OriginService } from './origin.service';
import { OriginController } from './origin.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [OriginController],
  providers: [OriginService, PrismaClient],
})
export class OriginModule {}
