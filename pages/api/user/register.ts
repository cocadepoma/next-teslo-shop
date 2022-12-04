import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { User } from '../../../models'
import bcrypt from 'bcryptjs';
import { jwt, validations } from '../../../utils';

type Data =
  | { message: string }
  | { token: string, user: { email: string, role: string, name: string } }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return loginUser(req, res)

    default:
      res.status(400).json({
        message: 'Bad request'
      })
  }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email = '', password = '', name = '' } = req.body as { email: string, password: string, name: string };

  if (password.length < 6) {
    return res.status(400).json({
      message: 'The password must have at least 6 characters',
    });
  }

  if (name.length < 2) {
    return res.status(400).json({
      message: 'The name must have at least 2 characters',
    });
  }

  if (!validations.isValidEmail(email)) {
    return res.status(400).json({
      message: 'The email is not valid',
    });
  }

  const newUser = new User({
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password),
    role: 'client',
    name,
  });

  await db.connect();
  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({
      message: 'This email is already registered',
    });
  }

  try {
    await newUser.save({ validateBeforeSave: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Something went wrong'
    });
  }

  const { role, _id } = newUser;

  const token = jwt.signToken(_id, email);

  await db.disconnect();

  return res.status(200).json({
    token,
    user: { email, role, name }
  })
}