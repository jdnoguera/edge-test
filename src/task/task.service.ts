import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Task} from "./entities/task.entity";
import {Repository} from "typeorm";
import {Result} from "../shared/Result";

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private readonly taskRepository: Repository<Task>) {
  }

  async create({Title, Description}: CreateTaskDto, userId: number): Promise<Result> {
    const task = new Task(Title, Description, userId);
    await this.taskRepository.save(task);
    return Result.ok();
  }

  async findAll(): Promise<Result> {
    return Result.ok(await this.taskRepository.find());
  }

  findOne(id: number): Promise<Task> {
    return this.taskRepository.findOneBy({Id: id});
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Result> {
    await this.taskRepository.save({Id: id, ...updateTaskDto});
    return Result.ok();
  }

  async delete(id: number): Promise<Result> {
    await this.taskRepository.softDelete(id);
    return Result.ok();
  }
}
