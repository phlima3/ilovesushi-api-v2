import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateFixedPriceDto } from './dto/create-fixed-price.dto';
import { UpdateFixedPriceDto } from './dto/update-fixed-price.dto';

@Injectable()
export class FixedPricesService {
  constructor(private prisma: PrismaService) {}

  async create(createFixedPriceDto: CreateFixedPriceDto) {
    return this.prisma.fixedPrice.create({
      data: createFixedPriceDto,
    });
  }

  async findAll() {
    return this.prisma.fixedPrice.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const fixedPrice = await this.prisma.fixedPrice.findUnique({
      where: { id },
    });

    if (!fixedPrice) {
      throw new NotFoundException(`Fixed price with ID ${id} not found`);
    }

    return fixedPrice;
  }

  async update(id: string, updateFixedPriceDto: UpdateFixedPriceDto) {
    await this.findOne(id); // Verifica se existe

    return this.prisma.fixedPrice.update({
      where: { id },
      data: updateFixedPriceDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id); // Verifica se existe

    return this.prisma.fixedPrice.delete({
      where: { id },
    });
  }
}
