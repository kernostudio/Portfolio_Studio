/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DeveloperPortfolioEdit from "../customAdminTemplates/DeveloperPortfolioEdit";
import productDesignerEdit from "../customAdminTemplates/productDesignerEdit";
import UiUxDesignerEdit from "../customAdminTemplates/UiUxDesignerEdit";

// Map slug to corresponding component
export const templatesCustomizeMap: Record<string, React.FC<any>> = {
  "product-designer-1": productDesignerEdit,
  "uiux-designer-1": UiUxDesignerEdit,
  "developer-portfolio-1": DeveloperPortfolioEdit,
  //   "modern-portfolio-1": ModernPortfolio,
  //   "minimal-portfolio-1": MinimalPortfolio,
  //   "classic-portfolio-1": ClassicPortfolio,
};
