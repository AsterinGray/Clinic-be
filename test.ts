import express from 'express'
import { query } from 'express-validator'
const app = express()

const getCertificateValidation = [
  query('data')
    .not()
    .isEmpty()
    .trim()
    .isBase64()
    .customSanitizer((value: any) =>
      JSON.parse(Buffer.from(value, 'base64').toString())
    )
    .isJSON(),
]

const middleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.sendStatus(200)
}

app.get('/', getCertificateValidation, middleware)

app.listen(3000)
