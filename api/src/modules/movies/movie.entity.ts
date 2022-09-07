import { Column, Entity } from 'typeorm';
import { BaseEntiity } from '../../base/entity.base';

@Entity('movies')
export class Movie extends BaseEntiity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  thumb: string;

  @Column()
  duration: number;
}
