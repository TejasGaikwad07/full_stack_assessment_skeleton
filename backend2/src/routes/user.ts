import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/find-all', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

router.get('/find-by-home', async (req, res) => {
  const homeId = parseInt(req.query.homeId as string);
  try {
    const users = await prisma.user.findMany({
      where: {
        homes: {
          some: {
            id: homeId
          }
        }
      }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

export default router;