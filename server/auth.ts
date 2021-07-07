import { parse } from 'cookie'
import jwt from 'jsonwebtoken'

const auth = (req: any, res: any, next: any) => {
    const cookie = req.headers.cookie
    if (cookie == undefined) {
        return next(res.status(401))
    }
    const parseCookie = parse(req.headers.cookie)
    const accessToken = parseCookie['x-access-token']
    const SECRET = process.env.SECRET || ''

    if (accessToken) {
        jwt.verify(accessToken, SECRET, (err: any) => {
            if (err) {
                return next(res.status(401))
            }
            next()
        })
    } else {
        return next(res.status(401))
    }
}

export default auth
