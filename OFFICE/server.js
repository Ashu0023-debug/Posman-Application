const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const { connectDB } = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./config/swagger");
const dashboardRoutes = require("./routes/dashboardRoutes");

dotenv.config();

const app = express();

// MIDDLEWARE 
app.use(express.json());
app.use(cors());

// SWAGGER SETUP 
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//  API ROUTES 
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/workspaces", require("./routes/workspaceRoutes"));
app.use("/api/collections", require("./routes/collectionRoutes"));
app.use("/api/requests", require("./routes/requestRoutes"));
app.use("/api/responses", require("./routes/responseRoutes"));
app.use("/api/environments", require("./routes/environmentRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

// CONNECT DATABASE 
connectDB()
  .then(() => {
    console.log("✅ MySQL Connected Successfully!");

    // ================== SERVE REACT APP ==================
    const clientBuildPath = path.join(__dirname, "client", "build");
    app.use(express.static(clientBuildPath));

    // SPA fallback: send index.html for all non-API routes
    app.get("*", (req, res) => {
      // Skip API routes
      if (req.path.startsWith("/api")) {
        return res.status(404).json({ error: "Not Found", path: req.originalUrl });
      }
      res.sendFile(path.join(clientBuildPath, "index.html"));
    });

    // ================== GLOBAL ERROR HANDLER ==================
    app.use((err, req, res, next) => {
      console.error("💥 Global Error:", err.stack);
      res.status(500).json({
        error: "Internal Server Error",
        message: err.message,
      });
    });

    // ================== START SERVER ==================
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at: http://localhost:${PORT}`);
      console.log(`📘 Swagger Docs available at: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect DB. Server not started:", err.message);
  });


// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const { connectDB } = require('./config/db'); 
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./config/swagger');

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Swagger UI
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// // Test route
// app.get('/api/test', (req, res) => {
//   res.json({ message: '✅ API is working fine!' });
// });

// // Connect to DB and start server
// connectDB()
//   .then(() => {
//     console.log('✅ MySQL Connected Successfully!');

//     // Routes
//     app.use('/api/auth', require('./routes/authRoutes'));
//     app.use('/api/users', require('./routes/userRoutes'));
//     app.use('/api/workspaces', require('./routes/workspaceRoutes'));
//     app.use('/api/collections', require('./routes/collectionRoutes'));
//     app.use('/api/requests', require('./routes/requestRoutes'));
//     app.use('/api/responses', require('./routes/responseRoutes'));
//     app.use('/api/environments', require('./routes/environmentRoutes'));

//     // 404 handler (for unmatched routes)
//     app.use((req, res) => {
//       res.status(404).json({ error: 'Not Found', path: req.originalUrl });
//     });

//     // Global error handler
//     app.use((err, req, res, next) => {
//       console.error('💥 Global Error:', err.stack);
//       res.status(500).json({
//         error: 'Internal Server Error',
//         message: err.message,
//       });
//     });

//     // Start server
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running at: http://localhost:${PORT}`);
//       console.log(`📘 Swagger Docs available at: http://localhost:${PORT}/api-docs`);
//     });
//   })
//   .catch((err) => {
//     console.error('❌ Failed to connect DB. Server not started:', err.message);
//   });
