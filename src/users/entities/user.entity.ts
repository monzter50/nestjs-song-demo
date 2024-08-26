import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity('users') // Declares the class as an entity
export class User {
  @PrimaryGeneratedColumn() // Auto-incremented primary key
  id: number;
  @Column() // Specifies a regular column
  name: string;
  @Column({ unique: true }) // Specifies a regular column
  email: string;
  @Column() // Specifies a regular column
  @Exclude()
  password: string;
}
