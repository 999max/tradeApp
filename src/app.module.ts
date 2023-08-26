import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SecurityModule } from './security/security.module';
import { TradeModule } from './trade/trade.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbWorkerModule } from './dbworker/dbworker.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    SecurityModule,
    TradeModule,
    DbWorkerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
