/**
 * @type {import('next-export-optimize-images').Config}
 */
const config = {
  outDir: "public/",
  generateFormats: ["avif", "webp"],
  convertFormat: [
    ["png", "webp"],
    ["jpg", "avif"],
  ],
};

module.exports = config;
