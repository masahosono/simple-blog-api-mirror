import dbConnect from 'src/util/dbConnect'
import ArticleModel from 'src/model/db/Article'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const article = await ArticleModel.findById(id);
        if (!article) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, body: article })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT':
      try {
        const article = await ArticleModel.updateOne({ "_id": id }, { $set: { ...req.body } });
        if (!article) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, body: article })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE':
      try {
        const article = await ArticleModel.deleteOne({ _id: id })
        if (!article) {
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
