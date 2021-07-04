import dbConnect from 'src/util/dbConnect'
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
                const categoryEntity = await CategoryModel.findById(id)
                if (!categoryEntity) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({
                    success: true,
                    body: categoryEntity,
                })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'PUT':
            try {
                const categoryEntity = await CategoryModel.updateOne(
                    { _id: id },
                    { $set: { ...req.body } }
                )
                if (!categoryEntity) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, body: categoryEntity })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'DELETE':
            try {
                const categoryEntity = await CategoryModel.deleteOne({
                    _id: id,
                })
                if (!categoryEntity) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, body: {} })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        default:
            res.status(400).json({ success: false })
            break
    }
}
