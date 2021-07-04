import dbConnect from 'src/util/dbConnect'
import ArticleModel from 'src/model/db/Article'
import { NextApiRequest, NextApiResponse } from 'next'
import CategoryModel from 'src/model/db/Category'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        query: { id },
        method,
    } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const articleEntity = await ArticleModel.findById(id)

                if (!articleEntity || !articleEntity.disp) {
                    return res.status(400).json({ success: false })
                }

                const json = {
                    _id: articleEntity._id,
                    title: articleEntity.title,
                    categoryId: articleEntity.category_id,
                    createDate: articleEntity.create_date,
                    updateDate: articleEntity.update_date,
                    text: articleEntity.text,
                    disp: articleEntity.disp,
                }

                console.log(json)

                res.status(200).json({
                    success: true,
                    body: {
                        article: json,
                    },
                })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        case 'PUT':
            try {
                const now = new Date()

                const articleEntity = await ArticleModel.updateOne(
                    { _id: id },
                    { $set: { ...req.body, update_date: now } }
                )

                if (!articleEntity) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({
                    success: true,
                    body: articleEntity,
                })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        case 'DELETE':
            try {
                const articleEntity = await ArticleModel.deleteOne({ _id: id })
                if (!articleEntity) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, body: articleEntity })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        default:
            res.status(400).json({ success: false })
            break
    }
}
