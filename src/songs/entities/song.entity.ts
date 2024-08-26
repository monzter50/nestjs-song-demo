import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('songs') // Declares the class as an entity
export class Song {
  @PrimaryGeneratedColumn() // Auto-incremented primary key
  id: number;

  @Column() // Specifies a regular column
  title: string;

  @Column('text', { array: true })
  artists: string[];

  @Column('date', { default: new Date() })
  releasedDate: Date;
}
