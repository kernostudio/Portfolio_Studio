/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import productDesignerEdit from "../customAdminTemplates/productDesignerEdit";

// Map slug to corresponding component
export const templatesCustomizeMap: Record<string, React.FC<any>> = {
  "product-designer-1": productDesignerEdit,
  //   "modern-portfolio-1": ModernPortfolio,
  //   "minimal-portfolio-1": MinimalPortfolio,
  //   "classic-portfolio-1": ClassicPortfolio,
};
