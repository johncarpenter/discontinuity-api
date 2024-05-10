const express = require("express");
const jwt = require("jsonwebtoken");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const helmet = require("helmet");

const app = express();
const PORT = 3000; // Proxy server port
const TARGET_URL = "http://127.0.0.1:8888/";

// Replace this with your actual JWT secret
const JWT_SECRET = process.env.JWT_SECRET;

// CORS Configuration
const corsOptions = {
  origin: "*", // Allow from any origin (adjust as needed for security)
  methods: "GET, POST, OPTIONS", // Adjust allowed methods as needed
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization", // Adjust allowed headers as needed
};
app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        // Your CSP directives here
        frameAncestors: [
          "'self'",
          "http://localhost:3000",
          "https://discontinuity.ai",
        ],
        defaultSrc: ["'self'", "http://localhost:3000"],
        // Add other directives as needed
      },
    },
  })
);

// // Middleware for JWT validation
// app.use((req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     return res.status(401).send("Authorization header missing");
//   }

//   const token = authHeader.split(" ")[1]; // Extract token from Bearer header

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     console.log("Decoded JWT:", decoded);
//     next();
//   } catch (err) {
//     return res.status(403).send("Invalid or expired token");
//   }
// });

// Proxy middleware
app.use(
  "/",
  createProxyMiddleware({
    target: TARGET_URL,
    changeOrigin: false, // May be needed for some APIs
    timeout: 60000, // Timeout in milliseconds
    on: {
      proxyRes: (proxyRes, req, res) => {
        proxyRes.headers["Content-Security-Policy"] =
          "frame-ancestors 'self' http://localhost:3000; ";
      },
    },
  })
);

app.listen(PORT, () => {
  console.log(`JWT Proxy server listening on port ${PORT}`);
});
