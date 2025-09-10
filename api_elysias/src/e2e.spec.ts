import { describe, it } from "bun:test";
import { treaty } from "@elysiajs/eden";
import { app } from ".";
import { CreatePhraseType } from "./phrase/phrase.type";

const api = treaty(app)

describe('e2e', () => {
  it.only('create phrases', async () => {

    const body: CreatePhraseType = {
      portuguese: 'Bom dia.',
      tag: 'test1'
    }

    const { data } = await api.phrases.post(body)

    console.log(data)
  })
})