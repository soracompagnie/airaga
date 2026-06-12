import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

/**
 * Processor is responsible for the static media pipeline.
 * It optimizes images during the build step.
 */
export class Processor {
  /**
   * @description Generates a unique hash for the given content, used for cache busting.
   * @param {Buffer} content - The content of the media file to hash.
   * @returns {string} An 8-character hash string derived from the content.
   */
  private static generateHash(content: Buffer): string {
    return crypto.createHash("md5").update(content).digest("hex").slice(0, 8);
  }

  /**
   * @description Reads the public directory, optimizes media files into a target directory,
   * and generates an asset manifest mapping original URLs to hashed URLs.
   * @param {string} inputDirectory - Absolute path to the source public directory.
   * @param {string} outputDirectory - Absolute path to the destination build public directory.
   * @returns {Promise<Record<string, string>>} Asset manifest dictionary.
   */
  public static async buildAssetManifest(
    inputDirectory: string,
    outputDirectory: string,
  ): Promise<Record<string, string>> {
    const manifest: Record<string, string> = {};

    try {
      const stat = await fs.stat(inputDirectory);
      if (!stat.isDirectory()) return manifest;
    } catch {
      return manifest;
    }

    await fs.mkdir(outputDirectory, { recursive: true });

    const processDirectory = async (currentPath: string): Promise<void> => {
      const entries = await fs.readdir(currentPath, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(currentPath, entry.name);

        if (entry.isDirectory()) {
          await processDirectory(fullPath);
          continue;
        }

        /**
         * =====================================================
         * For each media file:
         * 1. Read the file content into a buffer.
         * 2. Generate a unique hash from the content for cache busting.
         * =====================================================
         */
        const buffer = await fs.readFile(fullPath);
        const hash = Processor.generateHash(buffer);
        const ext = path.extname(entry.name).toLowerCase();
        const basename = path.basename(entry.name, ext);

        /* =====================================================
         * Determine the output filename:
         * - For images, convert to .webp format.
         * - For other media types, keep the original extension.
         * =====================================================
         */
        const isImage = [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
        const finalExt = isImage ? ".webp" : ext;
        const newFileName = `${basename}.${hash}${finalExt}`;
        const outputPath = path.join(outputDirectory, newFileName);
        const relativeOriginalPath = fullPath
          .replace(inputDirectory, "")
          .replace(/\\/g, "/");

        manifest[relativeOriginalPath] = `/${newFileName}`;

        if (!isImage) {
          await fs.copyFile(fullPath, outputPath);
          continue;
        }

        await sharp(buffer)
          .resize({
            width: 1920,
            height: 1080,
            fit: "inside",
            withoutEnlargement: true,
          })
          .webp({ quality: 80 })
          .toFile(outputPath);
      }
    };

    await processDirectory(inputDirectory);
    return manifest;
  }
}
