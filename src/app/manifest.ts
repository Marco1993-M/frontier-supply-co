import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Frontier Supply Co.",
    short_name: "Frontier",
    description: "South African caps and field gear in the making.",
    start_url: "/",
    display: "standalone",
    background_color: "#f2ede3",
    theme_color: "#101c28",
    icons: [{ src: "/favicon.png", sizes: "1254x1254", type: "image/png" }],
  };
}
