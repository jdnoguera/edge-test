import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  create({ Title, Description }: CreateTaskDto, userId: number): Promise<Task> {
    const task = new Task(Title, Description, userId);
    return this.taskRepository.save(task);
  }

  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  findOne(id: number): Promise<Task> {
    return this.taskRepository.findOneBy({ Id: id });
  }

  update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.taskRepository.save({ Id: id, ...updateTaskDto });
  }

  async delete(id: number): Promise<void> {
    await this.taskRepository.softDelete(id);
  }
}
