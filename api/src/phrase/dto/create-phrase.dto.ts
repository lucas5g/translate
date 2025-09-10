import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {  IsOptional, IsString } from 'class-validator'
export class CreatePhraseDto {
  @ApiProperty()
  @IsString()
  @Transform(({ value }) => `${value}.`)
  portuguese: string;

  // @ApiProperty({
  //   required: false
  // })
  // // @IsString()
  // @IsOptional()
  // @Transform(({ value }) => `${value}.`)

  // english?: string;  

  @ApiProperty()
  @IsString()
  tag: string
}
