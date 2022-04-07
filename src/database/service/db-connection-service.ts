import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { User } from "../../api/v1/user/entity/user.entity";
import { Task } from "../../api/v1/task/entity/task.entity";

@Injectable()
export class DatabaseConnectionService implements TypeOrmOptionsFactory {
  constructor(
    private configService: ConfigService
  ) {
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const config: TypeOrmModuleOptions = {
      type: 'postgres',
      host: this.configService.db_host,
      port: this.configService.db_port,
      username: this.configService.db_username,
      password: this.configService.db_password.toString(),
      database: this.configService.db_name,
      schema: this.configService.db_schema,
      entities: [
        User,
        Task
      ],
      synchronize: false,
      migrationsRun: false
    };
    return config;
  }
}
