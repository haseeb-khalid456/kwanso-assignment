import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import { Injectable } from '@nestjs/common';
import { ConfigInterface } from './interface/config.interface';

@Injectable()
export class ConfigService {
  private readonly envConfig: ConfigInterface;

  constructor() {
    dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
    const config: { [name: string]: string } = process.env;
    const parsedConfig = JSON.parse(JSON.stringify(config));
    this.envConfig = this.validateInput(parsedConfig);
  }

  private validateInput = (envConfig): ConfigInterface => {
    const envVarSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .required()
        .valid(
          'development',
          'production',
          'staging',
          'provision',
          'inspection',
        )
        .default('development'),
      PORT: Joi.number().required(),
      DB_HOST: Joi.string().required(),
      DB_PORT: Joi.number().required(),
      DB_USERNAME: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      DB_SCHEMA: Joi.string().required(),
      DB_NAME: Joi.string().required()
    });

    const { error, value: validatedEnvConfig } = envVarSchema.validate(
      envConfig,
      {
        abortEarly: false,
        allowUnknown: true,
      },
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  };

  get nodeEnv(): string {
    return this.envConfig.NODE_ENV;
  }

  get port(): string {
    return this.envConfig.PORT;
  }

  get jwtKey(): string {
    return this.envConfig.JWT_TOKEN;
  }

  get db_host(): string {
    return this.envConfig.DB_HOST;
  }

  get db_port(): number {
    return this.envConfig.DB_PORT;
  }

  get db_username(): string {
    return this.envConfig.DB_USERNAME;
  }

  get db_password(): string {
    return this.envConfig.DB_PASSWORD;
  }

  get db_schema(): string {
    return this.envConfig.DB_SCHEMA;
  }

  get db_name(): string {
    return this.envConfig.DB_NAME;
  }
}
