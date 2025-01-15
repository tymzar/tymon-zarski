/**
 * @type {import('next-export-optimize-images').Config}
 */
const config = {
  outDir: "public/",
  imageDir: "images",
  generateFormats: ["avif", "webp"],
  convertFormat: [
    ["png", "webp"],
    ["jpg", "avif"],
  ],
};

module.exports = config;
