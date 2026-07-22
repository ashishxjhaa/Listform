import { signupSchema } from "@workspace/validation"
import express from "express"
const app = express()

app.use(express.json())

app.post("/signup", (req, res) => {
  try {
    const result = signupSchema
  } catch (error) {
    console.log(error)
  }
})

app.listen(5000, () => {
  console.log("Server is running on 5000")
})
