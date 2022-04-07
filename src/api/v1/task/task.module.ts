import {
  Module,
} from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./entity/task.entity";
import { TaskController } from "./controller/task.controller";
import { AuthModule } from "../auth/auth.module";
import { TaskService } from "./service/task.service";
import { User } from "../user/entity/user.entity";

@Module({
  controllers: [TaskController],
  imports: [
    TypeOrmModule.forFeature([Task, User]),
    AuthModule
  ],
  providers: [
    TaskService
  ],
  exports: [
    TaskService
  ]
})
export class TaskModule {
}
