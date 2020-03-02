import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Index,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

@Entity()
export class Questions {
  @ObjectIdColumn()
  id: ObjectID;

  @Index({ unique: true })
  @Column()
  title: String;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}
