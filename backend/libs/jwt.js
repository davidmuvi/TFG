import jwt from 'jsonwebtoken'
import 'dotenv/config'
export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      {
        algorithm: 'HS256', expiresIn: '6h'
      },
      (err, token) => {
        if (err) reject(err)
        resolve(token)
      })
  })
}
