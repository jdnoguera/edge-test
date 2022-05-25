import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  Name: string;
  @ApiProperty()
  LastName: string;
  @ApiProperty()
  Email: string;
  @ApiProperty()
  Password: string;
}
