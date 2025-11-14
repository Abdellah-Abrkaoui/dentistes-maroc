import Dentist from "../models/Dentist.js";
import uploadGoogleToCloudinary from "../utils/uploadToCloudinary.js";
// GET all dentists
export const getAllDentists = async (req, res) => {
  try {
    const dentists = await Dentist.find();
    res.json(dentists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET dentist by ID
export const getDentistById = async (req, res) => {
  try {
    const dentist = await Dentist.findById(req.params.id);
    if (!dentist) return res.status(404).json({ message: "Not found" });
    res.json(dentist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET dentists by city
export const getDentistsByCity = async (req, res) => {
  try {
    const dentists = await Dentist.find({ city: req.params.city });
    res.json(dentists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET dentists by specialty
export const getDentistsBySpecialty = async (req, res) => {
  try {
    const dentists = await Dentist.find({ specialty: req.params.specialty });
    res.json(dentists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST multiple dentists (bulk insert) with Cloudinary upload
export const createDentist = async (req, res) => {
  try {
    let dentistsData = req.body;
    if (!Array.isArray(dentistsData)) {
      dentistsData = [dentistsData];
    }

    const processedDentists = await Promise.all(
      dentistsData.map(async (dentist) => {
        const { photoUrl, ...rest } = dentist;

        // If no photoUrl → return as-is (or set to null if required)
        if (!photoUrl) {
          return { ...rest, photoUrl: null }; // or throw if required
        }

        try {
          // Generate unique public ID
          const publicId = `dentist-${Date.now()}-${Math.floor(
            Math.random() * 1000
          )}`;

          // Upload to Cloudinary
          const cloudinaryUrl = await uploadGoogleToCloudinary(
            photoUrl,
            publicId
          );

          // Replace photoUrl with Cloudinary URL
          return {
            ...rest,
            photoUrl: cloudinaryUrl, // This is now the Cloudinary link
          };
        } catch (uploadErr) {
          console.error(
            `Upload failed for ${dentist.name}:`,
            uploadErr.message
          );
          // Fallback: keep original Google URL (or set null)
          return {
            ...rest,
            photoUrl, // keep original
          };
        }
      })
    );

    // Save all at once
    const newDentists = await Dentist.insertMany(processedDentists);

    res.status(201).json(newDentists);
  } catch (err) {
    console.error("Bulk insert error:", err);
    res.status(500).json({ message: err.message });
  }
};

// PUT update dentist by ID (admin)
export const updateDentistById = async (req, res) => {
  try {
    const updatedDentist = await Dentist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedDentist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE dentist by ID (admin)
export const deleteDentistById = async (req, res) => {
  try {
    await Dentist.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
