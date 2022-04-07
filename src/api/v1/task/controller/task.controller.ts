/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller, UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { crudGeneralOptions } from "../../../../common/constants/crud.config";
import { Task } from "../entity/task.entity";
import { TaskService } from "../service/task.service";
import { JwtGuard } from "../../auth/guard/jwt.guard";

@Crud({
  ...crudGeneralOptions,
  model: {
    type: Task
  },
  query: {
    ...crudGeneralOptions.query,
    join: {}
  },
  routes: {
    only: [
      'createOneBase',
      'getManyBase'
    ]
  }
})

@ApiBearerAuth()
@UseGuards(JwtGuard)
@ApiTags('Task')
@Controller('task')
export class TaskController implements CrudController<Task> {
  constructor(
    public service: TaskService
  ) {
  }
}
