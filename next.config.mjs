import withExportImages from "next-export-optimize-images";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
export default withExportImages(
  withBundleAnalyzer({
    images: {
      deviceSizes: [640, 960, 1280, 1600, 1920],
    },
    experimental: {
      optimizePackageImports: [
        "@radix-ui/react-icons",
        "react-icon-cloud",
        "@nextui-org/react",
        "@iconify/react",
        "usehooks-ts",
        "framer-motion",
        "react-hook-form",
        "react-markdown",
      ],
    },
    compress: true,
    reactStrictMode: true,
    output: "export",
  })
);
