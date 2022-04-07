import {
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "../entity/task.entity";

@Injectable()
export class TaskService extends TypeOrmCrudService<Task> {
  constructor(
    @InjectRepository(Task)
    public repo: Repository<Task>
  ) {
    super(repo);
  }
}
