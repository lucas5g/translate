import { Module } from '@nestjs/common';
import { PhraseService } from './phrase.service';
import { PhraseController } from './phrase.controller';
import { Tag } from '@/tag/entities/tag.entity';
import { TagModule } from '@/tag/tag.module';

@Module({
  imports: [TagModule],
  controllers: [PhraseController],
  providers: [PhraseService],
})
export class PhraseModule {}
