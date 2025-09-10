import { Test, TestingModule } from '@nestjs/testing';
import { PhraseService } from './phrase.service';
import { CreatePhraseDto } from './dto/create-phrase.dto';

describe('PhraseService', () => {
  let service: PhraseService;
  let id: number;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhraseService],
    }).compile();

    service = module.get<PhraseService>(PhraseService);

    const payload: CreatePhraseDto = {
      portuguese: 'Bom dia!',
      tag: 'test2'
    }
    const res = await service.create(payload)

    id = res.id
    console.log(res);

  });

  // afterAll(async () => {
  //   await service.remove(id)
  // } )

  it('findOne', async () => {

    const res = await service.findOne(id)

    console.log(res)

  });
});
