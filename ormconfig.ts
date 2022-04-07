import { ConfigService } from "./src/config/config.service";
import { DatabaseConnectionService } from "./src/database/service/db-connection-service";

const configService = new ConfigService();
const dbConnectionService = new DatabaseConnectionService(configService);
const dbConfig = dbConnectionService.createTypeOrmOptions();

export = {
  ...dbConfig,
  migrationsTableName: 'migration',
  migrations: ['./migrations/*.ts'],
  cli: {
    migrationsDir: './migrations'
  }
};