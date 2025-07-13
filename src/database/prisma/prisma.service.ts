import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'stdout',
          level: 'error',
        },
        {
          emit: 'stdout',
          level: 'info',
        },
        {
          emit: 'stdout',
          level: 'warn',
        },
      ],
    });
  }

  async onModuleInit() {
    // Log queries in development
    // if (process.env.NODE_ENV === 'development') {
    //   this.$on('query', (e: any) => {
    //     this.logger.debug(`Query: ${e.query}`);
    //     this.logger.debug(`Params: ${e.params}`);
    //     this.logger.debug(`Duration: ${e.duration}ms`);
    //   });
    // }

    try {
      await this.$connect();
      this.logger.log('✅ Successfully connected to database');
    } catch (error) {
      this.logger.error('❌ Failed to connect to database', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('🔌 Disconnected from database');
  }
}
