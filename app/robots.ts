import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {

  return {

    rules: {
      userAgent: "*",
      allow: "/",
    },

    sitemap: "https://05mart.in/sitemap.xml",

  };

}