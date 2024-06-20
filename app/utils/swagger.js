const swaggerJsdoc = require("swagger-jsdoc");
const { version } = require("../../package.json");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SNM API Docs",
      description:
        "Social Network for Music API documentation. This API is used by the SNM Web App but can be used with simple requests too. It uses the Spotify API under the hood.",
      version: version,
    },
    components: {
      securitySchemes: {
        CookieAuth: {
          type: "apiKey",
          in: "header",
          name: "connect.sid",
        },
      },
      schemas: {
        Playlist: {
          type: "object",
          properties: {
            user: {
              type: "string",
              example: "johndoe",
            },
            access: {
              type: "string",
              example: "access | public | private",
            },
            name: {
              type: "string",
              example: "Playlist name",
            },
            description: {
              type: "string",
              example: "Playlist description",
            },
            tags: {
              type: "array",
              example: ["rock", "punk", "pop"],
            },
            songs: {
              type: "array",
              example: ["7ouMYWpwJ422jRcDASZB7P", "4VqPOruhp5EdPBeR92t6lQ"],
            },
            createdAt: {
              type: "date",
              example: "1991-01-05T11:00:41.000+00:00",
            },
            updatedAt: {
              type: "date",
              example: "2004-01-05T11:00:41.000+00:00",
            },
          },
        },
        User: {
          type: "object",
          properties: {
            user: {
              type: "object",
              properties: {
                username: {
                  type: "string",
                  example: "johndoe",
                },
                firstName: {
                  type: "string",
                  example: "John",
                },
                lastName: {
                  type: "string",
                  example: "Doe",
                },
                bio: {
                  type: "string",
                  example: "This is my bio. Today is a beautiful day",
                },
                birthDate: {
                  type: "date",
                  example: "1991-01-05T11:00:41.000+00:00",
                },
                genres: {
                  type: "array",
                  example: ["rock", "punk", "metal"],
                },
                followers: {
                  type: "array",
                  example: ["bruce", "mikey", "elvis"],
                },
                follows: {
                  type: "array",
                  example: ["bruce", "mikey", "elvis"],
                },
                favourites: {
                  type: "array",
                  example: [
                    "60c72b2f5f1b2c6d88c485e1",
                    "63c72b2f5g1b4c6d88c587a9",
                  ],
                },
              },
            },
          },
        },
        Forbidden: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Forbidden",
            },
            status: {
              type: "integer",
              example: 403,
            },
            error: {
              type: "boolean",
              example: true,
            },
          },
        },
        Unauthorized: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Unauthorized",
            },
            status: {
              type: "integer",
              example: 401,
            },
            error: {
              type: "boolean",
              example: true,
            },
          },
        },
        BadRequest: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Bad request",
            },
            status: {
              type: "integer",
              example: 404,
            },
            error: {
              type: "boolean",
              example: true,
            },
          },
        },
        NotFound: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Resource not found",
            },
            status: {
              type: "integer",
              example: 404,
            },
            error: {
              type: "boolean",
              example: true,
            },
          },
        },
        InternalError: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Something bad happened",
            },
            status: {
              type: "integer",
              example: 500,
            },
            error: {
              type: "boolean",
              example: true,
            },
          },
        },
      },
    },
  },

  apis: ["./app/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
