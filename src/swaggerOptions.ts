const PORT = process.env.APP_PORT || '8080';
const HOST = process.env.APP_HOST || 'http://localhost';

export default {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Favs API',
      version: '1.0.0',
      description: 'API with express and mogoDB for admin favs list.',
    },
    servers: [
      {
        url: `${HOST}:${PORT}`,
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};
