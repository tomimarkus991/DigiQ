import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Hello extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  text: string;
}
