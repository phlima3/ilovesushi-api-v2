import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';

@Injectable()
export class MenuItemsService {
  constructor(private prisma: PrismaService) {}

  async create(createMenuItemDto: CreateMenuItemDto) {
    return this.prisma.menuItem.create({
      data: {
        ...createMenuItemDto,
        ingredientes: JSON.parse(
          JSON.stringify(createMenuItemDto.ingredientes),
        ),
      },
    });
  }

  async findAll() {
    return this.prisma.menuItem.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const menuItem = await this.prisma.menuItem.findUnique({
      where: { id },
    });

    if (!menuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }

    return menuItem;
  }

  async update(id: string, updateMenuItemDto: UpdateMenuItemDto) {
    await this.findOne(id); // Verifica se existe

    return this.prisma.menuItem.update({
      where: { id },
      data: {
        ...updateMenuItemDto,
        ingredientes: updateMenuItemDto.ingredientes
          ? JSON.parse(JSON.stringify(updateMenuItemDto.ingredientes))
          : undefined,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id); // Verifica se existe

    return this.prisma.menuItem.delete({
      where: { id },
    });
  }
}
