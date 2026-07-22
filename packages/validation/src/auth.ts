import { z } from "zod"

export const signupSchema = z.object({
  firstName: z.string(),
})
