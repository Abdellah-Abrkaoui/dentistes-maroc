import { Dentist } from "@/types/dentist";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const dentistsApi = {
  getAll: async (): Promise<Dentist[]> => {
    const response = await fetch(`${API_BASE_URL}/dentists`);
    if (!response.ok) throw new Error("Failed to fetch dentists");
    return response.json();
  },

  getById: async (id: string): Promise<Dentist> => {
    const response = await fetch(`${API_BASE_URL}/dentists/${id}`);
    if (!response.ok) throw new Error("Failed to fetch dentist");
    return response.json();
  },

  getByCity: async (city: string): Promise<Dentist[]> => {
    const response = await fetch(`${API_BASE_URL}/dentists/city/${city}`);
    if (!response.ok) throw new Error("Failed to fetch dentists by city");
    return response.json();
  },

  getBySpecialty: async (specialty: string): Promise<Dentist[]> => {
    const response = await fetch(`${API_BASE_URL}/dentists/specialty/${specialty}`);
    if (!response.ok) throw new Error("Failed to fetch dentists by specialty");
    return response.json();
  },
};
