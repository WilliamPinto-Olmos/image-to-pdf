import fs from "fs";
import PDFDocument from "pdfkit";
import { getAllFilesPathUnderDirectory, pathIsDirectory } from "./utils.js";
import sizeOf from "image-size";

/**
 * Convert an image or folder of images to a PDF
 * @param {string} input The filepath of the image or folder of images
 * @param {string} output The filepath of the output PDF
 */
function imgToPdf(input, output) {
  input = input.trim();
  output = output.trim();

  const images = getImages(input);
  const firstImage = images.shift();

  if (!firstImage) return;

  const { width, height } = sizeOf(firstImage);

  const doc = new PDFDocument({
    size: [width, height],
    margin: 0,
  });

  doc.pipe(fs.createWriteStream(output));

  addImageToPDF(doc, firstImage, { addPage: false });

  for (let i = 0; i < images.length; i++) {
    const image = images[i];

    addImageToPDF(doc, image);
  }

  doc.end();
}

/**
 *
 * @param {string} path
 * @returns {string[]}
 */
function getImages(path) {
  if (pathIsDirectory(path)) {
    return getAllFilesPathUnderDirectory(path);
  } else {
    return [path];
  }
}

/**
 *
 * @param {PDFKit.PDFDocument} doc
 * @param {string} image - The path to the image
 * @param {{ addPage?: boolean }} options
 */
function addImageToPDF(doc, image, { addPage } = { addPage: true }) {
  const { width, height } = sizeOf(image);

  if (addPage) {
    doc.addPage({
      size: [width, height],
      margin: 0,
    });
  }

  doc.image(image, {
    fit: [width, height],
  });
}

export { imgToPdf };
