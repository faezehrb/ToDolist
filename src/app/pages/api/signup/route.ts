import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';

// Simulated user storage (for the sake of example)
const userFilePath = path.join(process.cwd(), 'data', 'users.json');

// Handle POST requests to sign up users
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;

  // Load the existing users
  const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));

  // Check if the user already exists
  const userExists = users.some((user: any) => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password and store the user
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { username, password: hashedPassword };
  users.push(newUser);

  // Save the new user list
  fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2));

  return res.status(201).json({ message: 'User registered successfully' });
}