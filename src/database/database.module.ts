import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('db.uri'),
        onConnectionCreate(connection) {
          const logger = new Logger('DatabaseModule');
          connection.on('connected', () =>
            logger.debug('Successfully connected to the DB 🍻'),
          );
          connection.on('disconnected', () =>
            logger.debug('DB has been disconnected ⚠️'),
          );
          connection.on('error', () =>
            logger.debug('Failed to connect to the DB ❌'),
          );
          return connection;
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
