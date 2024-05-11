import jwt from 'jsonwebtoken'

export function createAccessToken (payLoad) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payLoad,
      'pruebatoken',
      {
        expiresIn: '1d'
      },
      (err, token) => {
        if (err) reject(err)
        resolve(token)
      })
  })
}
