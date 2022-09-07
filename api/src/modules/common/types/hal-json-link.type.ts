import { ApiProperty } from '@nestjs/swagger';

export class HALJsonLink {
  @ApiProperty()
  href: string;

  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  templated?: boolean;

  @ApiProperty({ required: false })
  title?: string;
}
