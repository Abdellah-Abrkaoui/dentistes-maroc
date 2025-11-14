// Simple utility to upload images to Cloudinary

import axios from "axios";
import stream from "stream";
import cloudinary from "../config/cloudinary.js";
import { promisify } from "util";

const pipeline = promisify(stream.pipeline);

/**
 * Uploads a Google image URL to Cloudinary and returns the secure URL.
 * @param {string} googleUrl - Google Maps photo URL
 * @param {string} publicId - Unique ID (e.g., 'dentist-123')
 * @returns {Promise<string>} Cloudinary secure URL
 */
async function uploadGoogleToCloudinary(googleUrl, publicId) {
  // Download as stream
  const response = await axios.get(googleUrl, { responseType: "stream" });

  // Upload stream to Cloudinary
  const uploadResult = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        public_id: publicId,
        folder: "dentists", // Optional
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    pipeline(response.data, uploadStream).catch(reject);
  });

  return uploadResult.secure_url;
}

export default uploadGoogleToCloudinary;
