import dbConnect from 'src/util/dbConnect'
import ArticleModel from 'src/model/db/Article'
import moment from 'moment'
import { NextApiRequest, NextApiResponse } from 'next'
import CategoryModel from 'src/model/db/Category'
import { JsonWebTokenError } from 'jsonwebtoken'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const articleEntityList = await ArticleModel.find()

                const json = articleEntityList
                    .map((articleEntity) => {
                        if (!articleEntity.disp) {
                            return
                        }

                        return {
                            _id: articleEntity._id,
                            title: articleEntity.title,
                            categoryId: articleEntity.category_id,
                            createDate: articleEntity.create_date,
                            updateDate: articleEntity.update_date,
                            text: articleEntity.text,
                            disp: articleEntity.disp,
                        }
                    })
                    .filter((artcleJson) => artcleJson)

                res.status(200).json({
                    success: true,
                    body: { articles: json },
                })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        case 'POST':
            const now = new Date()
            try {
                const articleEntity = await ArticleModel.create({
                    _id: moment(now).format('YYYYMMDDHHmmss'),
                    title: req.body.title,
                    category_id: req.body.categoryId,
                    text: req.body.text,
                    create_date: now,
                    update_date: now,
                    disp: true,
                })
                res.status(201).json({ success: true, body: articleEntity })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        default:
            res.status(400).json({ success: false })
            break
    }
}
