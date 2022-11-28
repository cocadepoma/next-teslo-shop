import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import Product from '../../../models/Product';
import { IProduct } from '../../../interfaces/products';

type Data =
  | { message: string }
  | IProduct;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'GET':
      return getProductBySlug(req, res);

    default:
      return res.status(400).json({
        message: 'Bad request'
      })
  }

}

const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();

  const { slug } = req.query

  const product = await Product.findOne({ slug }).lean();

  if (!product) {
    return res.status(404).json({
      message: 'The product does not exist'
    })
  }

  await db.disconnect();

  return res.json(product);
};