import { describe, it } from "bun:test";
import { AppService } from "./phrase/phrase.service";
import { CreatePhraseDto } from "./phrase/dto/create-phrase.dto";

describe('AppService', () => {
  const service = new AppService()

  it.only('create', async () => {
    const payload: CreatePhraseDto = {
      portuguese: 'Bom dia.',
      tag: 'test1'
    }

    const res = await service.create(payload)
    console.log(res)
  })

  it('findAll', async () => {
    const res = await service.findAll()
    console.log(res)
  //  ? expect(service.findAll()).toEqual([])
  })
})