const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getWatchlist = async (req, res) => {
  try {
    const { userId } = req.query; // For simplicity using query param, ideally from JWT
    const watchlist = await prisma.watchlist.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(watchlist);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch watchlist', error: error.message });
  }
};

const addToWatchlist = async (req, res) => {
  try {
    const { userId, movieId } = req.body;
    
    const existing = await prisma.watchlist.findUnique({
      where: { userId_movieId: { userId, movieId } }
    });

    if (existing) {
      return res.status(400).json({ message: 'Movie already in watchlist' });
    }

    const item = await prisma.watchlist.create({
      data: { userId, movieId }
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add to watchlist', error: error.message });
  }
};

const removeFromWatchlist = async (req, res) => {
  try {
    const { userId, movieId } = req.body;
    await prisma.watchlist.delete({
      where: { userId_movieId: { userId, movieId } }
    });
    res.json({ message: 'Removed from watchlist' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove from watchlist', error: error.message });
  }
};

module.exports = { getWatchlist, addToWatchlist, removeFromWatchlist };
