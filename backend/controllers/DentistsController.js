import Dentist from "../models/Dentist.js";
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

// POST new dentist (admin)
export const createDentist = async (req, res) => {
  const dentist = new Dentist(req.body);
  try {
    const newDentist = await dentist.save();
    res.status(201).json(newDentist);
  } catch (err) {
    res.status(400).json({ message: err.message });
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
