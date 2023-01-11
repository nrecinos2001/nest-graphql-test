import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Author {
  @PrimaryGeneratedColumn({ name: 'id' })
  @Field(() => Int, { description: 'id' })
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  @Field(() => String, { description: 'Name of the user' })
  name: string;

  @Column({ name: 'email', type: 'varchar', nullable: false, unique: true })
  @Field(() => String, { description: 'Email of the user' })
  email: string;

  @Column({
    name: 'username',
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  @Field(() => String, { description: 'Username' })
  username: string;

  @Column({ name: 'password', type: 'varchar' })
  @Field(() => String, { description: "User's password" })
  password: string;
}
