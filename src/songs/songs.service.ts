import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';
import { DeleteResult, Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song) private songRepository: Repository<Song>,
  ) {}
  async create(createSongDto: CreateSongDto): Promise<Song> {
    const song = new Song();
    song.title = createSongDto.title;
    song.artists = createSongDto.artists;
    song.releasedDate = createSongDto.releasedDate || new Date();
    return await this.songRepository.save(song);
  }

  async findAll(): Promise<Song[]> {
    return this.songRepository.find();
  }

  findOne(id: number): Promise<Song> {
    return this.songRepository.findOneBy({ id });
  }

  update(id: number, updateSongDto: UpdateSongDto) {
    return this.songRepository.update(id, updateSongDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.songRepository.delete(id);
  }
  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.releasedDate', 'DESC');

    return paginate<Song>(queryBuilder, options);
  }
}
