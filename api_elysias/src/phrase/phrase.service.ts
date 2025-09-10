import { prisma } from "@/utils/prisma"
import { CreatePhraseType } from "./phrase.type"

export class PhraseService {
  async create(data: CreatePhraseType) {
    console.log({ test: data })
    const res = await prisma.phrase.create({
      data:{
        portuguese: data.portuguese,
        // english: data.english,
        // tag: data.tag
      }
    })
    console.log({ res })
    return res
  }


  findAll() {
    return prisma.phrase.findMany()
  }
}