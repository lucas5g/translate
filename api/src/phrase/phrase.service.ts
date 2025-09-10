import { Injectable } from '@nestjs/common';
import { CreatePhraseDto } from './dto/create-phrase.dto';
import { UpdatePhraseDto } from './dto/update-phrase.dto';
import { prisma } from '@/utils/prisma';
import { translate } from '@/utils/translate';
import { elevenLabs } from '@/utils/eleven-labs';
import { TagService } from '@/tag/tag.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PhraseService {
  constructor(private readonly tagService: TagService) { }
  async upsert(dto: CreatePhraseDto) {
    const tag = await this.tagService.findOneWhere({
      name: dto.tag
    }) ?? await this.tagService.create({
      name: dto.tag
    })

    const phrase = await this.findOneWhere({
      portuguese: dto.portuguese
    }) ?? await this.create(dto)

    await prisma.phraseTag.upsert({
      where: {
        phraseId_tagId: {
          phraseId: phrase.id,
          tagId: tag.id
        }
      },
      update: {},
      create: {
        phraseId: phrase.id,
        tagId: tag.id
      }
    })

    return phrase
  }

  async create(createPhraseDto: CreatePhraseDto) {

    const english = await translate(createPhraseDto.portuguese)

    return await prisma.phrase.create({
      data: {
        portuguese: createPhraseDto.portuguese,
        english,
        audio: await elevenLabs(english),
      },
    })
  }

  findAll() {
    return prisma.phrase.findMany();
  }

  findOne(id: number) {
    return prisma.phrase.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        portuguese: true,
        english: true,
        tags: true
      }
    });
  }

  findOneWhere(where:Prisma.PhraseWhereUniqueInput){   
    return prisma.phrase.findUnique({
      where
    })
  }

  update(id: number, updatePhraseDto: UpdatePhraseDto) {
    return `This action updates a #${id} phrase`;
  }

  async remove(id: number) {

    await prisma.phraseTag.deleteMany({
      where: {
        phraseId: id
      }
    })

    return prisma.phrase.delete({
      where: {
        id
      }
    })
  }
}
