import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JoinColumn } from 'typeorm';
import {Exclude} from "class-transformer";

@Entity()
export class Task {
  constructor(title: string, description: string, userId: number) {
    this.Title = title;
    this.Description = description
    this.UserId = userId
  }
  
  @PrimaryGeneratedColumn()
  Id: number;
  @Column({ length: 100 })
  Title: string;
  @Column({ length: 255 })
  Description: string;
  @CreateDateColumn()
  CreatedAt: Date;
  @Exclude({toPlainOnly: true})
  @DeleteDateColumn()
  IsDeleted: Date;
  @ManyToOne(() => User)
  @JoinColumn({ name: 'UserId' })
  User: User;
  @Column()
  UserId: number;
}
