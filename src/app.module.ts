import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from './config/config.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionService } from "./database/service/db-connection-service";
import { AuthModule } from "./api/v1/auth/auth.module";
import { TaskModule } from "./api/v1/task/task.module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ConfigModule,
    ScheduleModule.forRoot(),
    AuthModule,
    TaskModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
