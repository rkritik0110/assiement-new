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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const passwordUtils_1 = require("../utils/passwordUtils");
const errorTypes_1 = require("../utils/errorTypes");
const prisma = new client_1.PrismaClient();
const userSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    password: zod_1.z.string().min(6, { message: "Password must be at least 6 characters" }),
});
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = userSchema.parse(req.body);
        // Check if user already exists
        const existingUser = yield prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new errorTypes_1.BadRequestError('User with this email already exists');
        }
        // Hash password
        const hashedPassword = yield (0, passwordUtils_1.hashPassword)(password);
        // Create user
        const newUser = yield prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            data: {
                id: newUser.id,
                email: newUser.email,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = userSchema.parse(req.body);
        // Find user
        const user = yield prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new errorTypes_1.NotFoundError('User not found');
        }
        // Check password
        const isPasswordValid = yield (0, passwordUtils_1.comparePassword)(password, user.password);
        if (!isPasswordValid) {
            throw new errorTypes_1.UnauthorizedError('Invalid credentials');
        }
        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            data: {
                id: user.id,
                email: user.email,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;
