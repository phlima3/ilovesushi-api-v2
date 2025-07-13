import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';

@Injectable()
export class TokenService {
  constructor(private prisma: PrismaService) {}

  async getCurrent() {
    const token = await this.prisma.token.findUnique({
      where: { id: 'current' },
    });

    if (!token) {
      // Criar se não existir
      return this.prisma.token.create({
        data: {
          id: 'current',
          token: null,
        },
      });
    }

    return token;
  }

  async updateCurrent(updateTokenDto: UpdateTokenDto) {
    return this.prisma.token.upsert({
      where: { id: 'current' },
      update: updateTokenDto,
      create: {
        id: 'current',
        ...updateTokenDto,
      },
    });
  }

  async deleteCurrent() {
    return this.prisma.token.upsert({
      where: { id: 'current' },
      update: { token: null },
      create: {
        id: 'current',
        token: null,
      },
    });
  }
}
