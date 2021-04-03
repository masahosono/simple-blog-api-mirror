import dbConnect from 'src/util/dbConnect'
import ArticleModel from 'src/model/db/Article'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { page },
        method,
    } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const pet = await ArticleModel.findById(page);
                if (!pet) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, data: pet })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        default:
            res.status(400).json({ success: false })
            break
    }
}
