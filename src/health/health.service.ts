import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class HealthService {
  constructor(private prisma: PrismaService) {}

  async check() {
    const timestamp = new Date().toISOString();
    
    // Check database connection
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      
      return {
        status: 'ok',
        timestamp,
        database: 'connected',
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'unknown',
        version: process.env.npm_package_version || '1.0.0',
      };
    } catch (error) {
      return {
        status: 'error',
        timestamp,
        database: 'disconnected',
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'unknown',
        version: process.env.npm_package_version || '1.0.0',
        error: error.message,
      };
    }
  }
} 