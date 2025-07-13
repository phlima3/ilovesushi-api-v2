import { Module } from '@nestjs/common';
import { SalesVolumeService } from './sales-volume.service';
import { SalesVolumeController } from './sales-volume.controller';
import { PrismaModule } from '../database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SalesVolumeController],
  providers: [SalesVolumeService],
  exports: [SalesVolumeService],
})
export class SalesVolumeModule {}
