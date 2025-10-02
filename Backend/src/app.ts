import compression from "compression";
import cors from "cors";
import express from "express";
import { authRoutes } from "./modules/auth/auth.route";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { userRoutes } from "./modules/user/user.route";
import { categoriesRoutes } from "./modules/category/category.route";
import { adminTemplatesRoutes } from "./modules/templateAdmin/template.route";
import { userTemplateRoutes } from "./modules/userTemplate/userTemplate.route";
const app = express();

// Middleware
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(compression()); // Compresses response bodies for faster delivery
app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/admin/templates", adminTemplatesRoutes);
app.use("/api/user-templates", userTemplateRoutes);
// Default route for testing
app.get("/", (_req, res) => {
  res.send("API is running");
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});
app.use(globalErrorHandler);
export default app;
