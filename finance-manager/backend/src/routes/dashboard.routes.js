import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import Config from '../models/Config.js';
import Transaction from '../models/Transaction.js';

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 100;
        const sort = req.query.sort || '-date'; // Default: newest first

        const skip = (page - 1) * limit;

        // Get config
        const config = await Config.findOne().select("-accessPassword");

        // Get paginated transactions (newest first by default)
        const transactions = await Transaction.find()
            .populate('type')
            .populate('tags')
            .populate('wealthComponent')
            .populate('deductedFrom')
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .lean();

        // Check if more data exists
        const totalCount = await Transaction.countDocuments();
        const hasMore = skip + transactions.length < totalCount;

        res.json({
            config,
            transactions,
            pagination: {
                page,
                limit,
                total: totalCount,
                hasMore,
                totalPages: Math.ceil(totalCount / limit)
            }
        });
    } catch (error) {
        console.error("Dashboard fetch error:", error);
        res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
});

export default router;
