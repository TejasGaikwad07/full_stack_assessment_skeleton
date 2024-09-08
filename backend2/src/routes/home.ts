import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/find-by-user', async (req, res) => {
  const userId = parseInt(req.query.userId as string);
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = 50;

  try {
    const homes = await prisma.home.findMany({
      where: {
        users: {
          some: {
            id: userId
          }
        }
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const totalHomes = await prisma.home.count({
      where: {
        users: {
          some: {
            id: userId
          }
        }
      }
    });

    res.json({
      homes,
      currentPage: page,
      totalPages: Math.ceil(totalHomes / pageSize),
      totalHomes,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching homes", error });
  }
});

router.put('/update-users', async (req, res) => {
  const { homeId, userIds } = req.body;
  try {
    const updatedHome = await prisma.home.update({
      where: { id: homeId },
      data: {
        users: {
          set: userIds.map((id: number) => ({ id }))
        }
      },
      include: { users: true }
    });
    res.json({ message: "Users updated successfully", home: updatedHome });
  } catch (error) {
    res.status(500).json({ message: "Error updating users", error });
  }
});

export default router;