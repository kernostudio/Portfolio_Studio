/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ProductDesigner from "@/components/customAdminTemplates/ProductDesigner";

// Map slug to corresponding component
export const templatesMap: Record<string, React.FC<any>> = {
  "product-designer-1": ProductDesigner,
  //   "modern-portfolio-1": ModernPortfolio,
  //   "minimal-portfolio-1": MinimalPortfolio,
  //   "classic-portfolio-1": ClassicPortfolio,
};
