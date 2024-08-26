import {
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Song } from '../../songs/entities/song.entity';

@Entity('users') // Declares the class as an entity
export class Artist {
  @PrimaryGeneratedColumn() // Auto-incremented primary key
  id: number;
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
  @ManyToMany(() => Song, (song) => song.artists)
  songs: Song[];
}
