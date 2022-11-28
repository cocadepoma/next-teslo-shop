import type { NextApiRequest, NextApiResponse } from 'next';
import { db, seedDatabase } from '../../../database';
import { Product } from '../../../models';

type Data = {
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  if (process.env.NODE_ENV === 'production') {
    return res.status(401).json({ message: 'You do not have access to this service' })
  }

  await db.connect();

  // const products = seedDatabase.initialData.products.filter(product => product.slug.length > 0)
  await Product.deleteMany();
  await Product.insertMany(seedDatabase.initialData.products);
  // await Product.updateOne(seedDatabase.initialData.products[0]);


  await db.disconnect();

  res.status(200).json({ message: 'everything is gonna be all right!' })
}