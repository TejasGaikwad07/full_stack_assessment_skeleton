"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.get('/find-by-user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.query.userId);
    const page = parseInt(req.query.page) || 1;
    const pageSize = 50;
    try {
        const homes = yield prisma.home.findMany({
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
        const totalHomes = yield prisma.home.count({
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
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching homes", error });
    }
}));
router.put('/update-users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { homeId, userIds } = req.body;
    try {
        const updatedHome = yield prisma.home.update({
            where: { id: homeId },
            data: {
                users: {
                    set: userIds.map((id) => ({ id }))
                }
            },
            include: { users: true }
        });
        res.json({ message: "Users updated successfully", home: updatedHome });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating users", error });
    }
}));
exports.default = router;
