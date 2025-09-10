import { Injectable } from '@nestjs/common';
import { CreatePhraseDto } from './dto/create-phrase.dto';
import { UpdatePhraseDto } from './dto/update-phrase.dto';
import { prisma } from '@/utils/prisma';
import { translate } from '@/utils/translate';

@Injectable()
export class PhraseService {
  async create(createPhraseDto: CreatePhraseDto) {
    const tagUpsert =
      await prisma.tag.findUnique({
        where: {
          name: createPhraseDto.tag
        }
      }) 
      ?? await prisma.tag.create({
        data: {
          name: createPhraseDto.tag
        }
      })

    const phrase = await prisma.phrase.upsert({
      where: {
        portuguese: createPhraseDto.portuguese
      },
      create: {
        portuguese: createPhraseDto.portuguese,
        english: await translate(createPhraseDto.portuguese)      
      },
      update: {
        portuguese: createPhraseDto.portuguese
      },      
      select: {
        id: true,
        portuguese: true,
        english: true,
        tags: true
      }
    })

    if (!phrase.tags.some(tag => tag.tagId === tagUpsert.id)) {      

      await prisma.phraseTag.create({
        data: {
          phraseId: phrase.id,
          tagId: tagUpsert.id
        }
      })
    }

    return phrase


  }

  findAll() {
    return `This action returns all phrase`;
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
