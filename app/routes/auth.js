const express = require("express");
const controller = require("../controller/auth");

const router = express.Router();

/**
 * @openapi
 * /register:
 *   post:
 *     summary: Register a new user
 *     operationId: registerUser
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "newuser"
 *               password:
 *                 type: string
 *                 example: "securepassword123"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "newuser@example.com"
 *               birth:
 *                 type: string
 *                 format: date
 *                 example: "2000-01-01"
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               genres:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Rock", "Jazz"]
 *     responses:
 *       204:
 *         description: Successfully registered the user
 *       400:
 *         description: Missing required field or invalid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 *       403:
 *         description: Username or email already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Forbidden'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalError'
 */
router.post("/register", controller.post.register);

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Log in a user
 *     operationId: loginUser
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cred:
 *                 type: string
 *                 description: Email or username
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: "password123"
 *     responses:
 *       204:
 *         description: Successfully logged in
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: connect.sid=sdfnSEHFkjsdnfKFJS...LKDJHGSsdf; Path=/;
 *       400:
 *         description: Missing required field
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unauthorized'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalError'
 */
router.post("/login", controller.post.login);

/**
 * @openapi
 * /logout:
 *   post:
 *     summary: Log out a user
 *     operationId: logoutUser
 *     tags:
 *       - Auth
 *     responses:
 *       204:
 *         description: Successfully logged out, destroys the session
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalError'
 */
router.post("/logout", controller.post.logout);

module.exports = router;
