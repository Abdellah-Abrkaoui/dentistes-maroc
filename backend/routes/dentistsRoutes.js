import express from "express";
const router = express.Router();
import {
  getAllDentists,
  createDentist,
  deleteDentistById,
  getDentistById,
  getDentistsByCity,
  getDentistsBySpecialty,
  updateDentistById,
} from "../controllers/DentistsController.js";
import { verifyFirebaseToken } from "../middleware/auth.js";

// GET all dentists
router.get("/", getAllDentists);

// GET dentist by ID
router.get("/:id", getDentistById);

// GET dentists by city
router.get("/city/:city", getDentistsByCity);

// GET dentists by specialty
router.get("/specialty/:specialty", getDentistsBySpecialty);

// POST new dentist (admin)
router.post("/", verifyFirebaseToken, createDentist);

// PUT update dentist by ID (admin)
router.put("/:id", verifyFirebaseToken, updateDentistById);

// DELETE dentist by ID (admin)
router.delete("/:id", verifyFirebaseToken, deleteDentistById);

export default router;
