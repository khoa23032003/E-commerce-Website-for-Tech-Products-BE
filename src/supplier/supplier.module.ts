import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [SupplierController],
  providers: [SupplierService, PrismaClient],
})
export class SupplierModule {}
