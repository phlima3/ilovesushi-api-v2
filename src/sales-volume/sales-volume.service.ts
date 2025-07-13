import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateSalesVolumeDto } from './dto/create-sales-volume.dto';
import { UpdateSalesVolumeDto } from './dto/update-sales-volume.dto';

@Injectable()
export class SalesVolumeService {
  constructor(private prisma: PrismaService) {}

  async getCurrent() {
    const salesVolume = await this.prisma.salesVolume.findUnique({
      where: { id: 'current' },
    });

    if (!salesVolume) {
      // Criar se não existir
      return this.prisma.salesVolume.create({
        data: {
          id: 'current',
          volume: 0,
        },
      });
    }

    return salesVolume;
  }

  async updateCurrent(updateSalesVolumeDto: UpdateSalesVolumeDto) {
    return this.prisma.salesVolume.upsert({
      where: { id: 'current' },
      update: updateSalesVolumeDto,
      create: {
        id: 'current',
        ...updateSalesVolumeDto,
      },
    });
  }
}
