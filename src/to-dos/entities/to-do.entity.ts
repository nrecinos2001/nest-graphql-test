import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Author } from 'src/author/entities/author.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ToDo {
  @PrimaryGeneratedColumn({ name: 'id' })
  @Field(() => Int, { description: 'Todo Id' })
  id: number;

  @Column({ name: 'title', type: 'varchar', nullable: false })
  @Field(() => String, { description: 'Todo title' })
  title: string;

  @Column({ name: 'is_completed', type: 'boolean', default: false })
  @Field(() => Boolean, { description: 'Todo completion' })
  isCompleted: boolean;

  @ManyToOne(() => Author, (author) => author.todos)
  @Field(() => Author, { description: 'Author of Todos' })
  author: Author;
}
