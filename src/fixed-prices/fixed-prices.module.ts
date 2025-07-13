import { Module } from '@nestjs/common';
import { FixedPricesService } from './fixed-prices.service';
import { FixedPricesController } from './fixed-prices.controller';
import { PrismaModule } from '../database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FixedPricesController],
  providers: [FixedPricesService],
  exports: [FixedPricesService],
})
export class FixedPricesModule {}
