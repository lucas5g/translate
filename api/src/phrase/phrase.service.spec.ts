import { Test, TestingModule } from '@nestjs/testing';
import { PhraseService } from './phrase.service';
import { CreatePhraseDto } from './dto/create-phrase.dto';
import { plainToInstance } from 'class-transformer';
import { TagService } from '@/tag/tag.service';

describe('PhraseService', () => {
  let service: PhraseService;
  let id = 1;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhraseService, TagService],
    }).compile();

    service = module.get<PhraseService>(PhraseService);

  });

  it('upsert', async () => {

    const payload: CreatePhraseDto = {
      portuguese: 'Bom tarde!',
      tag: 'test'
    }

    const dto = plainToInstance(CreatePhraseDto, payload)

    const res = await service.upsert(dto)

    expect(res).toMatchObject(dto)

  })

  it('findAll', async () => {

    const res = await service.findAll()

    expect(res).toBeInstanceOf(Array)

  });


  it.only('findOneAudio', async () => {

    const res = await service.findOneAudio(id)
  })
});
