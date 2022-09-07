import { ApiProperty } from '@nestjs/swagger';

export class MovieDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  thumb: string;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  description: string;
}
