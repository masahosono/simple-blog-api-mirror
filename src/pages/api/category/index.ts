import dbConnect from 'src/util/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'
import CategoryModel from 'src/model/db/Category'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const categoryEntityList = await CategoryModel.find()

                const json = categoryEntityList.map((categoryEntity) => {
                    return {
                        _id: categoryEntity._id,
                        category: categoryEntity.category,
                        categoryName: categoryEntity.category_name,
                        parentId: categoryEntity.parent_id,
                    }
                })

                res.status(200).json({
                    success: true,
                    body: { categories: json },
                })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            try {
                const categoryEntity = await CategoryModel.create({
                    category: req.body.category,
                    category_name: req.body.categoryName,
                    parent_id: req.body.parentId,
                })
                res.status(201).json({ success: true, body: categoryEntity })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        default:
            res.status(400).json({ success: false })
            break
    }
}
