import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @ApiProperty()
  Title: string;
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @ApiProperty()
  Description: string;
}
