import dbConnect from 'src/util/dbConnect'
import ArticleModel from 'src/model/db/Article'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        query: { page },
        method,
    } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const start = typeof page == 'string' ? Number(page) * 10 : 0
                const article = await ArticleModel.find()
                    .sort({ _id: 1 })
                    .skip(start)
                    .limit(10)
                res.status(200).json({ success: true, body: article })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        default:
            res.status(400).json({ success: false })
            break
    }
}
