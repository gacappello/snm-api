const express = require("express");
const controller = require("../controller/playlists");

const router = express.Router();

/**
 * @openapi
 * /playlists/get:
 *   get:
 *     summary: Get all playlists that the user can see
 *     security:
 *       - CookieAuth: []
 *     operationId: getAllPlaylists
 *     tags:
 *       - Playlists
 *     responses:
 *       200:
 *         description: Successfully retrieved playlists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 myPlaylists:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Playlist'
 *                 friendsPlaylists:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Playlist'
 *                 othersPlaylists:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Playlist'
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
router.get("/get", controller.get.get);

/**
 * @openapi
 * /playlists/get/user/{user}:
 *   get:
 *     summary: Get playlists for a specific user
 *     security:
 *       - CookieAuth: []
 *     operationId: getUserPlaylistsByUsername
 *     tags:
 *       - Playlists
 *     parameters:
 *       - name: user
 *         in: path
 *         required: true
 *         description: Username to fetch playlists for
 *         schema:
 *           type: string
 *           example: johndoe
 *     responses:
 *       200:
 *         description: Successfully retrieved playlists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 playlists:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Playlist'
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
router.get("/get/user/:user", controller.get.getUser);

/**
 * @openapi
 * /playlists/get/{id}:
 *   get:
 *     summary: Get a playlist by ID
 *     operationId: getPlaylistById
 *     tags:
 *       - Playlists
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the playlist to fetch
 *         schema:
 *           type: string
 *           example: 60c72b2f5f1b2c6d88c485e1
 *     responses:
 *       200:
 *         description: Successfully retrieved playlist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 *       401:
 *         description: Unauthorized, session is invalid or expired
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unauthorized'
 *       403:
 *         description: Unauthorized access to the playlist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unauthorized'
 *       404:
 *         description: Playlist not found
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
router.get("/get/:id", controller.get.getId);

/**
 * @openapi
 * /playlists/delete/{id}:
 *   delete:
 *     summary: Delete a playlist by ID
 *     operationId: deletePlaylistById
 *     tags:
 *       - Playlists
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the playlist to delete
 *         schema:
 *           type: string
 *           example: 60c72b2f5f1b2c6d88c485e1
 *     responses:
 *       200:
 *         description: Successfully deleted playlist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 *       401:
 *         description: Unauthorized, session is invalid or expired
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unauthorized'
 *       404:
 *         description: Playlist not found for the user
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
router.delete("/delete/:id", controller.delete.deleteId);

/**
 * @openapi
 * /playlists/add:
 *   post:
 *     summary: Create a new playlist
 *     operationId: createPlaylist
 *     tags:
 *       - Playlists
 *     security:
 *       - CookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: My Favorite Songs
 *               description:
 *                 type: string
 *                 example: A collection of my all-time favorite songs.
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: rock
 *               access:
 *                 type: string
 *                 enum: [public, private, followers]
 *                 example: public
 *     responses:
 *       204:
 *         description: Playlist created successfully
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
router.post("/add", controller.post.add);

/**
 * @openapi
 * /playlists/modify/{id}:
 *   put:
 *     summary: Update an existing playlist of the user
 *     operationId: updatePlaylistById
 *     tags:
 *       - Playlists
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the playlist to update
 *         schema:
 *           type: string
 *           example: 60c72b2f5f1b2c6d88c485e1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: My Favorite Songs
 *               description:
 *                 type: string
 *                 example: A collection of my all-time favorite songs.
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: rock
 *               songs:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: 7ouMYWpwJ422jRcDASZB7P
 *               access:
 *                 type: string
 *                 enum: [public, private, followers]
 *                 example: public
 *     responses:
 *       204:
 *         description: Playlist updated successfully
 *       401:
 *         description: Unauthorized to update the playlist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unauthorized'
 *       404:
 *         description: Playlist not found
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
router.put("/modify/:id", controller.put.modifyId);

/**
 * @openapi
 * /playlists/like/{id}:
 *   post:
 *     summary: Like a playlist
 *     operationId: likePlaylistById
 *     tags:
 *       - Playlists
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the playlist to like
 *         schema:
 *           type: string
 *           example: 60c72b2f5f1b2c6d88c485e1
 *     responses:
 *       204:
 *         description: Playlist liked successfully
 *       401:
 *         description: Unauthorized to like the playlist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unauthorized'
 *       404:
 *         description: Playlist not found
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
router.post("/like/:id", controller.post.likeId);

/**
 * @openapi
 * /playlists/dislike/{id}:
 *   post:
 *     summary: Dislike a playlist
 *     operationId: dislikePlaylistById
 *     tags:
 *       - Playlists
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the playlist to dislike
 *         schema:
 *           type: string
 *           example: 60c72b2f5f1b2c6d88c485e1
 *     responses:
 *       204:
 *         description: Playlist disliked successfully
 *       401:
 *         description: Unauthorized to dislike the playlist
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
router.post("/dislike/:id", controller.post.dislikeId);

/**
 * @openapi
 * /playlists/insert/song/{id}:
 *   put:
 *     summary: Insert a song into a playlist
 *     operationId: insertSongIntoPlaylistById
 *     tags:
 *       - Playlists
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the playlist to insert the song into
 *         schema:
 *           type: string
 *           example: 60c72b2f5f1b2c6d88c485e1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               songId:
 *                 type: string
 *                 example: 7ouMYWpwJ422jRcDASZB7P
 *     responses:
 *       204:
 *         description: Song inserted into the playlist successfully
 *       401:
 *         description: Unauthorized to insert song into the playlist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unauthorized'
 *       404:
 *         description: Playlist not found for user
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
router.put("/insert/song/:id", controller.put.insertSongId);

/**
 * @openapi
 * /playlists/remove/song/{id}:
 *   put:
 *     summary: Remove a song from a playlist
 *     operationId: removeSongFromPlaylistById
 *     tags:
 *       - Playlists
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the playlist to remove the song from
 *         schema:
 *           type: string
 *           example: 60c72b2f5f1b2c6d88c485e1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               position:
 *                 type: number
 *                 description: Index position of the song to be removed from the playlist
 *                 example: 0
 *     responses:
 *       204:
 *         description: Song removed from the playlist successfully
 *       400:
 *         description: Invalid position or bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequest'
 *       401:
 *         description: Unauthorized to remove song from the playlist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unauthorized'
 *       404:
 *         description: Playlist not found for user
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

router.put("/remove/song/:id", controller.put.removeSongId);

module.exports = router;
