import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
export class CreatePhraseDto {
  @ApiProperty()
  @IsString()
  @Transform(({ value }) => `${value}.`)
  portuguese: string;

  @ApiProperty()
  @IsString()
  tag: string;
}
