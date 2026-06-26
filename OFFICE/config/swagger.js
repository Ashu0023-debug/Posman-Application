// const swaggerDocument = {
//   openapi: '3.0.0', 
//   info: {
//     title: 'Postman Clone API',
//     version: '1.0.0',
//     description: 'API documentation for Postman Clone project',
//   },
//   servers: [
//     {
//       url: 'http://localhost:5000',
//     },
//   ],
//   paths: {
//     // Auth Routes
//     '/api/auth/login': {
//       post: {
//         summary: 'User login',
//         requestBody: {
//           required: true,
//           content: {
//             'application/json': {
//               schema: {
//                 type: 'object',
//                 properties: {
//                   email: { type: 'string' },
//                   password: { type: 'string' },
//                 },
//                 required: ['email', 'password'],
//               },
//             },
//           },
//         },
//         responses: {
//           200: { description: 'Login successful' },
//           401: { description: 'Invalid credentials' },
//         },
//       },
//     },
//     '/api/auth/register': {
//       post: {
//         summary: 'User registration',
//         requestBody: {
//           required: true,
//           content: {
//             'application/json': {
//               schema: {
//                 type: 'object',
//                 properties: {
//                   name: { type: 'string' },
//                   email: { type: 'string' },
//                   password: { type: 'string' },
//                 },
//                 required: ['name', 'email', 'password'],
//               },
//             },
//           },
//         },
//         responses: {
//           201: { description: 'User registered successfully' },
//           400: { description: 'Bad request' },
//         },
//       },
//     },

//     // Users Routes
//     '/api/users': {
//       get: { summary: 'Get all users', responses: { 200: { description: 'List of users' } } },
//     },

//     // Workspaces Routes
//     '/api/workspaces': {
//       get: { summary: 'Get all workspaces', responses: { 200: { description: 'List of workspaces' } } },
//       post: {
//         summary: 'Create a new workspace',
//         requestBody: {
//           required: true,
//           content: {
//             'application/json': {
//               schema: { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] },
//             },
//           },
//         },
//         responses: { 201: { description: 'Workspace created' } },
//       },
//     },

//     // Collections Routes
//     '/api/collections': {
//       get: { summary: 'Get all collections', responses: { 200: { description: 'List of collections' } } },
//       post: {
//         summary: 'Create a new collection',
//         requestBody: {
//           required: true,
//           content: {
//             'application/json': {
//               schema: { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] },
//             },
//           },
//         },
//         responses: { 201: { description: 'Collection created' } },
//       },
//     },

//     // Requests Routes
//     '/api/requests': {
//       get: { summary: 'Get all requests', responses: { 200: { description: 'List of requests' } } },
//       post: {
//         summary: 'Create a new request',
//         requestBody: {
//           required: true,
//           content: {
//             'application/json': {
//               schema: { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] },
//             },
//           },
//         },
//         responses: { 201: { description: 'Request created' } },
//       },
//     },

//     // Responses Routes
//     '/api/responses': {
//       get: { summary: 'Get all responses', responses: { 200: { description: 'List of responses' } } },
//     },

//     // Environments Routes
//     '/api/environments': {
//       get: { summary: 'Get all environments', responses: { 200: { description: 'List of environments' } } },
//       post: {
//         summary: 'Create a new environment',
//         requestBody: {
//           required: true,
//           content: {
//             'application/json': {
//               schema: { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] },
//             },
//           },
//         },
//         responses: { 201: { description: 'Environment created' } },
//       },
//     },
//   },
// };

// module.exports = swaggerDocument; 
const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Postman Clone API',
    version: '1.0.0',
    description: 'API documentation for Postman Clone project',
  },
  servers: [
    {
      url: 'http://localhost:5000',
    },
  ],
  paths: {
    // ===================== AUTH ROUTES =====================
    '/api/auth/login': {
      post: {
        summary: 'User login',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' },
                },
                required: ['email', 'password'],
              },
            },
          },
        },
        responses: {
          200: { description: 'Login successful' },
          401: { description: 'Invalid credentials' },
        },
      },
    },
    '/api/auth/register': {
      post: {
        summary: 'User registration',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string' },
                  password: { type: 'string' },
                },
                required: ['name', 'email', 'password'],
              },
            },
          },
        },
        responses: {
          201: { description: 'User registered successfully' },
          400: { description: 'Bad request' },
        },
      },
    },

    // ===================== USERS ROUTES =====================
    '/api/users': {
      get: { summary: 'Get all users', responses: { 200: { description: 'List of users' } } },
    },
    '/api/users/{id}': {
      put: {
        summary: 'Update user details',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { name: { type: 'string' }, email: { type: 'string' } },
              },
            },
          },
        },
        responses: { 200: { description: 'User updated successfully' } },
      },
      delete: {
        summary: 'Delete user',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'User deleted successfully' } },
      },
    },

    // ===================== WORKSPACES ROUTES =====================
    '/api/workspaces': {
      get: { summary: 'Get all workspaces', responses: { 200: { description: 'List of workspaces' } } },
      post: {
        summary: 'Create a new workspace',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] },
            },
          },
        },
        responses: { 201: { description: 'Workspace created' } },
      },
    },
    '/api/workspaces/{id}': {
      put: {
        summary: 'Update a workspace',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { type: 'object', properties: { name: { type: 'string' } } },
            },
          },
        },
        responses: { 200: { description: 'Workspace updated' } },
      },
      delete: {
        summary: 'Delete a workspace',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Workspace deleted' } },
      },
    },

    // ===================== COLLECTIONS ROUTES =====================
    '/api/collections': {
      get: { summary: 'Get all collections', responses: { 200: { description: 'List of collections' } } },
      post: {
        summary: 'Create a new collection',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] },
            },
          },
        },
        responses: { 201: { description: 'Collection created' } },
      },
    },
    '/api/collections/{id}': {
      put: {
        summary: 'Update a collection',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { type: 'object', properties: { name: { type: 'string' } } },
            },
          },
        },
        responses: { 200: { description: 'Collection updated' } },
      },
      delete: {
        summary: 'Delete a collection',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Collection deleted' } },
      },
    },

    // ===================== REQUESTS ROUTES =====================
    '/api/requests': {
      get: { summary: 'Get all requests', responses: { 200: { description: 'List of requests' } } },
      post: {
        summary: 'Create a new request',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { type: 'object', properties: { name: { type: 'string' }, method: { type: 'string' }, url: { type: 'string' } }, required: ['name', 'method', 'url'] },
            },
          },
        },
        responses: { 201: { description: 'Request created' } },
      },
    },
    '/api/requests/{id}': {
      put: {
        summary: 'Update a request',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { type: 'object', properties: { name: { type: 'string' }, method: { type: 'string' }, url: { type: 'string' } } },
            },
          },
        },
        responses: { 200: { description: 'Request updated' } },
      },
      delete: {
        summary: 'Delete a request',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Request deleted' } },
      },
    },

    // ===================== RESPONSES ROUTES =====================
    '/api/responses': {
      get: { summary: 'Get all responses', responses: { 200: { description: 'List of responses' } } },
    },

    // ===================== ENVIRONMENTS ROUTES =====================
    '/api/environments': {
      get: { summary: 'Get all environments', responses: { 200: { description: 'List of environments' } } },
      post: {
        summary: 'Create a new environment',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] },
            },
          },
        },
        responses: { 201: { description: 'Environment created' } },
      },
    },
    '/api/environments/{id}': {
      put: {
        summary: 'Update an environment',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { type: 'object', properties: { name: { type: 'string' } } },
            },
          },
        },
        responses: { 200: { description: 'Environment updated' } },
      },
      delete: {
        summary: 'Delete an environment',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Environment deleted' } },
      },
    },
  },
};

module.exports = swaggerDocument;
