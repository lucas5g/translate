import { Test, TestingModule } from '@nestjs/testing';
import { PhraseService } from './phrase.service';
import { CreatePhraseDto } from './dto/create-phrase.dto';
import { plainToInstance } from 'class-transformer';
import { TagService } from '@/tag/tag.service';

describe('PhraseService', () => {
  let service: PhraseService;
  const id = 1;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhraseService, TagService],
    }).compile();

    service = module.get<PhraseService>(PhraseService);
  });

  it.only('upsert', async () => {
    const payload: CreatePhraseDto = {
      portuguese: 'Bom tarde!',
      tag: 'test',
    };

    const dto = plainToInstance(CreatePhraseDto, payload);

    const res = await service.upsert(dto);

    expect(res).toMatchObject({
      portuguese: dto.portuguese,
    });
  });

  it('findAll', async () => {
    const res = await service.findAll();

    expect(res).toBeInstanceOf(Array);
  });

  it('findOne', async () => {
    const res = await service.findOne(id);

    expect(res).toBeInstanceOf(Object);
  });
});
