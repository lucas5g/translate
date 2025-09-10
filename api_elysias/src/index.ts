import { Elysia } from "elysia";
import { CreatePhraseSchema } from "./phrase/phrase.schema";
import { PhraseService } from "./phrase/phrase.service";
const phraseService = new PhraseService()

export const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .post(
    '/phrases',
    async ({ body }) => {
      const res =  await phraseService.create(body)
      return res
    },
    {
      body: CreatePhraseSchema
    }

  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
