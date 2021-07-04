import dbConnect from 'src/util/dbConnect'
import UserModel from 'src/model/db/User'
import cookie from 'cookie'

import { NextApiRequest, NextApiResponse } from 'next'

import jwt from 'jsonwebtoken'

const SECRET = process.env.SECRET || ''

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        body: { name, password },
        method,
    } = req
    await dbConnect()

    switch (method) {
        case 'POST':
            try {
                const user = await UserModel.findOne({
                    name: name,
                })
                if (!user) {
                    res.json({
                        success: false,
                        message: 'Authentication failed. User not found.',
                    })
                    return
                }
                if (user.password != password) {
                    res.json({
                        success: false,
                        message: 'Authentication failed. Wrong password.',
                    })
                    return
                }
                const userPayload = {
                    name: user.name,
                    admin: user.admin,
                }
                const accessToken = jwt.sign(userPayload, SECRET, {
                    expiresIn: '24h',
                })
                res.setHeader(
                    'Set-Cookie',
                    cookie.serialize('x-access-token', accessToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        sameSite: 'strict',
                        maxAge: 3600,
                        path: '/',
                    })
                )
                res.status(201).json({ success: true })
            } catch (error) {
                console.log(error)
                res.status(400).json({ success: false })
            }
            break

        default:
            res.status(400).json({ success: false })
            break
    }
}
