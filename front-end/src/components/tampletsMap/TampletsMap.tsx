/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ProductDesigner from "@/components/customAdminTemplates/ProductDesigner";
import UiUxDesigner from "../customAdminTemplates/UiUxDesigner";

// Map slug to corresponding component
export const templatesMap: Record<string, React.FC<any>> = {
  "product-designer-1": ProductDesigner,
  "uiux-designer-1": UiUxDesigner,
  //   "modern-portfolio-1": ModernPortfolio,
  //   "minimal-portfolio-1": MinimalPortfolio,
  //   "classic-portfolio-1": ClassicPortfolio,
};
