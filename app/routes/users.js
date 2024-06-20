const express = require("express");
const controller = require("../controller/users");

const router = express.Router();

/**
 * @openapi
 * /users/get/{user}:
 *   get:
 *     summary: Get user details by username
 *     security:
 *       - CookieAuth: []
 *     operationId: getUserByUsername
 *     tags:
 *       - Users
 *     parameters:
 *       - name: user
 *         in: path
 *         required: true
 *         description: Username to fetch details for
 *         schema:
 *           type: string
 *           example: johndoe
 *     responses:
 *       200:
 *         description: Successful response with user details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized, session is invalid or expired
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unauthorized'
 *       404:
 *         description: Username not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalError'
 */
router.get("/get/:user", controller.get.getUser);

/**
 * @openapi
 * /users/get:
 *   get:
 *     summary: Get details of the authenticated user
 *     security:
 *       - CookieAuth: []
 *     operationId: getAuthenticatedUser
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Successfully retrieved authenticated user's details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized, session is invalid or expired
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
router.get("/get", controller.get.getMe);

/**
 * @openapi
 * /users/follow/{user}:
 *   post:
 *     summary: Follow a user
 *     security:
 *       - CookieAuth: []
 *     operationId: postFollowUser
 *     tags:
 *       - Users
 *     parameters:
 *       - name: user
 *         in: path
 *         required: true
 *         description: Username of the user to follow
 *         schema:
 *           type: string
 *           example: johndoe
 *     responses:
 *       204:
 *         description: User followed successfully, no content returned
 *       400:
 *         description: Bad request, such as trying to follow oneself
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 *       401:
 *         description: Unauthorized, session is invalid or expired
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unauthorized'
 *       404:
 *         description: Username not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *              schema:
 *                  $ref: '#/components/schemas/InternalError'
 */
router.post("/follow/:user", controller.post.followUser);

/**
 * @openapi
 * /users/unfollow/{user}:
 *   post:
 *     summary: Unfollow a user
 *     security:
 *       - CookieAuth: []
 *     operationId: unfollowUser
 *     tags:
 *       - Users
 *     parameters:
 *       - name: user
 *         in: path
 *         required: true
 *         description: Username to unfollow
 *         schema:
 *           type: string
 *           example: johndoe
 *     responses:
 *       204:
 *         description: Successfully unfollowed the user
 *       400:
 *         description: Bad request, such as trying to unfollow oneself
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 *       401:
 *         description: Unauthorized, session is invalid or expired
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unauthorized'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFound'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalError'
 */
router.post("/unfollow/:user", controller.post.unfollowUser);

/**
 * @openapi
 * /users/update:
 *   put:
 *     summary: Update authenticated user's profile
 *     security:
 *       - CookieAuth: []
 *     operationId: updateUserProfile
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
 *               bio:
 *                 type: string
 *                 example: "Music enthusiast"
 *     responses:
 *       204:
 *         description: Successfully updated the user profile
 *       401:
 *         description: Unauthorized, session is invalid or expired
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
router.put("/update", controller.put.update);

module.exports = router;
