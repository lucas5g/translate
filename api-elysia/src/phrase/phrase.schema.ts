import { t } from "elysia";

export const CreatePhraseSchema = t.Object({
  portuguese: t.String(),
  english: t.Optional(t.String()),
  tag: t.String()
})

