const express = require("express");
const controller = require("../controller/spotify");

const router = express.Router();

/**
 * @openapi
 * /sapi/albums:
 *   post:
 *     summary: Get albums by their Spotify IDs
 *     security:
 *       - CookieAuth: []
 *     operationId: getAlbumsByIds
 *     tags:
 *       - Spotify API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ids
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["1Z2KIL1aDm97LhVY3Onbse", "4sLtOBOzn4s3GDUv3c5oJD"]
 *               market:
 *                 type: string
 *                 example: US
 *                 description: Optional. A country code (ISO 3166-1 alpha-2) to limit the results to a specific market.
 *     responses:
 *       200:
 *         description: Successfully retrieved albums
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                   type: string
 *                   example: Successfully retrieved albums. For more details, refer to the Spotify API documentation.
 *       400:
 *         description: Bad request. Invalid or missing parameters.
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalError'
 *     externalDocs:
 *       description: Spotify Web API Documentation
 *       url: https://developer.spotify.com/documentation/web-api
 */
router.post("/albums", controller.post.albums);

/**
 * @openapi
 * /sapi/albums/{id}:
 *   post:
 *     summary: Get album by its Spotify ID
 *     security:
 *       - CookieAuth: []
 *     operationId: getAlbumById
 *     tags:
 *       - Spotify API
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Spotify album ID
 *         schema:
 *           type: string
 *           example: "1Z2KIL1aDm97LhVY3Onbse"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               market:
 *                 type: string
 *                 example: US
 *                 description: Optional. A country code (ISO 3166-1 alpha-2) to limit the results to a specific market.
 *     responses:
 *       200:
 *         description: Successfully retrieved album
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully retrieved album. For more details, refer to the Spotify API documentation.
 *       400:
 *         description: Bad request. Invalid or missing parameters.
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalError'
 *     externalDocs:
 *       description: Spotify Web API Documentation
 *       url: https://developer.spotify.com/documentation/web-api
 */
router.post("/albums/:id", controller.post.albumsId);

/**
 * @openapi
 * /sapi/albums/{id}/tracks:
 *   post:
 *     summary: Get tracks of an album by its Spotify ID
 *     security:
 *       - CookieAuth: []
 *     operationId: getAlbumTracksById
 *     tags:
 *       - Spotify API
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Spotify album ID
 *         schema:
 *           type: string
 *           example: "1Z2KIL1aDm97LhVY3Onbse"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               market:
 *                 type: string
 *                 example: US
 *                 description: Optional. A country code (ISO 3166-1 alpha-2) to limit the results to a specific market.
 *               limit:
 *                 type: integer
 *                 example: 10
 *                 description: Optional. The maximum number of tracks to retrieve.
 *               offset:
 *                 type: integer
 *                 example: 0
 *                 description: Optional. The index of the first track to return (starting at 0).
 *     responses:
 *       200:
 *         description: Successfully retrieved tracks of the album
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully retrieved tracks of the album. For more details, refer to the Spotify API documentation.
 *       400:
 *         description: Bad request. Invalid or missing parameters.
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalError'
 *     externalDocs:
 *       description: Spotify Web API Documentation
 *       url: https://developer.spotify.com/documentation/web-api
 */
router.post("/albums/:id/tracks", controller.post.albumsIdTracks);

/**
 * @openapi
 * /sapi/artists:
 *   post:
 *     summary: Get artists by their Spotify IDs
 *     security:
 *       - CookieAuth: []
 *     operationId: getArtistsByIds
 *     tags:
 *       - Spotify API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ids
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["0OdUWJ0sBjDrqHygGUXeCF", "3WrFJ7ztbogyGnTHbHJFl2"]
 *     responses:
 *       200:
 *         description: Successfully retrieved artists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully retrieved artists. For more details, refer to the Spotify API documentation.
 *       400:
 *         description: Bad request. Invalid or missing parameters.
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalError'
 *     externalDocs:
 *       description: Spotify Web API Documentation
 *       url: https://developer.spotify.com/documentation/web-api
 */
router.post("/artists", controller.post.artists);

/**
 * @openapi
 * /sapi/artists/{id}:
 *   get:
 *     summary: Get an artist by their Spotify ID
 *     security:
 *       - CookieAuth: []
 *     operationId: getArtistById
 *     tags:
 *       - Spotify API
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Spotify ID of the artist
 *         schema:
 *           type: string
 *           example: "0OdUWJ0sBjDrqHygGUXeCF"
 *     responses:
 *       200:
 *         description: Successfully retrieved the artist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully retrieved the artist. For more details, refer to the Spotify API documentation.
 *       400:
 *         description: Bad request. Invalid artist ID or other parameters.
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
 *         description: Artist not found
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
 *     externalDocs:
 *       description: Spotify Web API Documentation
 *       url: https://developer.spotify.com/documentation/web-api
 */
router.get("/artists/:id", controller.get.artistsId);

/**
 * @openapi
 * /sapi/artists/{id}/albums:
 *   post:
 *     summary: Get albums by an artist's Spotify ID
 *     security:
 *       - CookieAuth: []
 *     operationId: getArtistAlbumsById
 *     tags:
 *       - Spotify API
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Spotify ID of the artist
 *         schema:
 *           type: string
 *           example: "0OdUWJ0sBjDrqHygGUXeCF"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               include_groups:
 *                 type: string
 *                 enum: [album, single, appears_on, compilation]
 *                 example: album,single
 *                 description: Optional. Filter albums by group type.
 *               market:
 *                 type: string
 *                 example: US
 *                 description: Optional. A country code (ISO 3166-1 alpha-2) to limit the results to a specific market.
 *               limit:
 *                 type: integer
 *                 example: 10
 *                 minimum: 1
 *                 maximum: 50
 *                 description: Optional. The maximum number of albums to return. Default is 20.
 *               offset:
 *                 type: integer
 *                 example: 0
 *                 minimum: 0
 *                 description: Optional. The index of the first album to return. Default is 0.
 *     responses:
 *       200:
 *         description: Successfully retrieved albums by the artist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully retrieved albums by the artist. For more details, refer to the Spotify API documentation.
 *       400:
 *         description: Bad request. Invalid artist ID or other parameters.
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalError'
 *     externalDocs:
 *       description: Spotify Web API Documentation
 *       url: https://developer.spotify.com/documentation/web-api/reference/artists/get-artists-albums/
 */
router.post("/artists/:id/albums", controller.post.artistsIdAlbums);

/**
 * @openapi
 * /sapi/artists/{id}/top-traks:
 *   post:
 *     summary: Get an artist's top tracks by Spotify ID
 *     security:
 *       - CookieAuth: []
 *     operationId: getArtistTopTracksById
 *     tags:
 *       - Spotify API
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Spotify ID of the artist
 *         schema:
 *           type: string
 *           example: "0OdUWJ0sBjDrqHygGUXeCF"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               market:
 *                 type: string
 *                 example: US
 *                 description: Optional. A country code (ISO 3166-1 alpha-2) to limit the results to a specific market.
 *     responses:
 *       200:
 *         description: Successfully retrieved artist's top tracks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully retrieved artist's top tracks. For more details, refer to the Spotify API documentation.
 *       400:
 *         description: Bad request. Invalid artist ID or other parameters.
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalError'
 *     externalDocs:
 *       description: Spotify Web API Documentation
 *       url: https://developer.spotify.com/documentation/web-api/reference/artists/get-artists-top-tracks/
 */
router.post("/artists/:id/top-tracks", controller.post.artistsIdTopTracks);

/**
 * @openapi
 * /sapi/artists/{id}/related-artists:
 *   get:
 *     summary: Get related artists by Spotify ID
 *     security:
 *       - CookieAuth: []
 *     operationId: getRelatedArtistsById
 *     tags:
 *       - Spotify API
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Spotify ID of the artist
 *         schema:
 *           type: string
 *           example: "0OdUWJ0sBjDrqHygGUXeCF"
 *     responses:
 *       200:
 *         description: Successfully retrieved related artists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully retrieved related artists. For more details, refer to the Spotify API documentation.
 *       400:
 *         description: Bad request. Invalid artist ID or other parameters.
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalError'
 *     externalDocs:
 *       description: Spotify Web API Documentation
 *       url: https://developer.spotify.com/documentation/web-api/reference/artists/get-related-artists/
 */
router.get("/artists/:id/related-artists", controller.get.artistsIdRelated);

/**
 * @openapi
 * /sapi/tracks:
 *   post:
 *     summary: Get tracks by their Spotify IDs
 *     security:
 *       - CookieAuth: []
 *     operationId: getTracksByIds
 *     tags:
 *       - Spotify API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ids
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["3n3Ppam7vgaVa1iaRUc9Lp", "4P5KoWXOxwuobLmHXLMobV"]
 *               market:
 *                 type: string
 *                 example: US
 *                 description: Optional. A country code (ISO 3166-1 alpha-2) to limit the results to a specific market.
 *     responses:
 *       200:
 *         description: Successfully retrieved tracks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully retrieved tracks. For more details, refer to the Spotify API documentation.
 *       400:
 *         description: Bad request. Invalid or missing parameters.
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalError'
 *     externalDocs:
 *       description: Spotify Web API Documentation
 *       url: https://developer.spotify.com/documentation/web-api/reference/tracks/get-several-tracks/
 */
router.post("/tracks", controller.post.tracks);

/**
 * @openapi
 * /sapi/tracks/{id}:
 *   post:
 *     summary: Get a track by its Spotify ID
 *     security:
 *       - CookieAuth: []
 *     operationId: getTrackById
 *     tags:
 *       - Spotify API
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Spotify ID of the track to retrieve
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               market:
 *                 type: string
 *                 example: US
 *                 description: Optional. A country code (ISO 3166-1 alpha-2) to limit the results to a specific market.
 *     responses:
 *       200:
 *         description: Successfully retrieved the track
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully retrieved the track. For more details, refer to the Spotify API documentation.
 *       400:
 *         description: Bad request. Invalid or missing parameters.
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
 *         description: Track not found
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
 *     externalDocs:
 *       description: Spotify Web API Documentation
 *       url: https://developer.spotify.com/documentation/web-api/reference/tracks/get-track/
 */
router.post("/tracks/:id", controller.post.tracksId);

/**
 * @openapi
 * /sapi/search:
 *   post:
 *     summary: Search tracks on Spotify
 *     security:
 *       - CookieAuth: []
 *     operationId: searchTracks
 *     tags:
 *       - Spotify API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               q:
 *                 type: string
 *                 example: "love"
 *                 description: The search query keywords
 *               market:
 *                 type: string
 *                 example: US
 *                 description: Optional. A country code (ISO 3166-1 alpha-2) to limit the results to a specific market.
 *               limit:
 *                 type: integer
 *                 example: 20
 *                 description: Optional. The maximum number of tracks to return (default 20, max 50).
 *               offset:
 *                 type: integer
 *                 example: 0
 *                 description: Optional. The index of the first track to return (default 0).
 *     responses:
 *       200:
 *         description: Successfully retrieved search results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully retrieved search results. For more details, refer to the Spotify API documentation.
 *       400:
 *         description: Bad request. Invalid or missing parameters.
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalError'
 *     externalDocs:
 *       description: Spotify Web API Documentation
 *       url: https://developer.spotify.com/documentation/web-api/reference/search/search/
 */
router.post("/search", controller.post.search);

/**
 * @openapi
 * /sapi/recommendations:
 *   post:
 *     summary: Get track recommendations based on seeds (artists, genres, tracks)
 *     security:
 *       - CookieAuth: []
 *     operationId: getTrackRecommendations
 *     tags:
 *       - Spotify API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               limit:
 *                 type: integer
 *                 example: 20
 *                 description: Optional. The maximum number of tracks to return (default 20, maxz 100).
 *               market:
 *                 type: string
 *                 example: US
 *                 description: Optional. A country code (ISO 3166-1 alpha-2) to limit the results to a specific market.
 *               seed_artists:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["4NHQUGzhtTLFvgF5SZesLK"]
 *                 description: Optional. Array of Spotify artist IDs.
 *               seed_genres:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["pop", "rock"]
 *                 description: Optional. Array of Spotify genre names.
 *               seed_tracks:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["0c6xIDDpzE81m2q797ordA"]
 *                 description: Optional. Array of Spotify track IDs.
 *     responses:
 *       200:
 *         description: Successfully retrieved track recommendations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully retrieved track recommendations. For more details, refer to the Spotify API documentation.
 *       400:
 *         description: Bad request. Invalid or missing parameters.
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalError'
 *     externalDocs:
 *       description: Spotify Web API Documentation
 *       url: https://developer.spotify.com/documentation/web-api/reference/browse/get-recommendations/
 */
router.post("/recommendations", controller.post.recommendations);

/**
 * @openapi
 * /recommendations/genres:
 *   get:
 *     summary: Get available genre seeds for recommendations
 *     security:
 *       - CookieAuth: []
 *     operationId: getAvailableGenreSeeds
 *     tags:
 *       - Spotify API
 *     responses:
 *       '200':
 *         description: Successfully retrieved available genre seeds
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 genres:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["acoustic", "afrobeat", "alt-rock"]
 *                 message:
 *                   type: string
 *                   example: Successfully retrieved available genre seeds. For more details, refer to the Spotify API documentation.
 *       '401':
 *         description: Unauthorized, session is invalid or expired
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unauthorized'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalError'
 *     externalDocs:
 *       description: Spotify Web API Documentation
 *       url: https://developer.spotify.com/documentation/web-api/reference/browse/get-recommendations/
 */
router.get(
  "/recommendations/available-genre-seeds",
  controller.get.recommendationsGenres
);

module.exports = router;
