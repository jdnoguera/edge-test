import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTaskDto {
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
