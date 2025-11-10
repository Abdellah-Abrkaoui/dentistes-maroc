import { createContext, useContext, useState, ReactNode } from "react";

type Language = "fr" | "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // Navigation
    home: "Accueil",
    dentists: "Dentistes",
    admin: "Admin",
    
    // Hero
    heroTitle: "Trouvez le meilleur dentiste près de chez vous au Maroc",
    heroSubtitle: "Découvrez les meilleurs dentistes près de chez vous. Consultez les avis, comparez les spécialités et prenez rendez-vous facilement.",
    
    // Search
    searchPlaceholder: "Rechercher un dentiste par nom...",
    allCities: "Toutes les villes",
    allSpecialties: "Toutes les spécialités",
    search: "Rechercher",
    nearMe: "Près de moi",
    
    // Stats
    totalDentists: "Dentistes",
    citiesCovered: "Villes",
    specialties: "Spécialités",
    
    // Cards
    reviews: "avis",
    call: "Appeler",
    directions: "Itinéraire",
    website: "Site web",
    viewDetails: "Voir les détails",
    
    // Detail Page
    contactInfo: "Informations de contact",
    address: "Adresse",
    phone: "Téléphone",
    openingHours: "Horaires d'ouverture",
    location: "Localisation",
    quickActions: "Actions rapides",
    callNow: "Appeler maintenant",
    getDirections: "Obtenir l'itinéraire",
    visitWebsite: "Visiter le site web",
    addToFavorites: "Ajouter aux favoris",
    removeFromFavorites: "Retirer des favoris",
    share: "Partager",
    back: "Retour",
    
    // Listings
    dentistsFound: "dentistes trouvés",
    dentistFound: "dentiste trouvé",
    noDentistsFound: "Aucun dentiste trouvé avec ces critères",
    tryModifyingFilters: "Essayez de modifier vos filtres de recherche",
    sortBy: "Trier par",
    rating: "Note",
    name: "Nom",
    distance: "Distance",
    gridView: "Grille",
    listView: "Liste",
    
    // Admin
    adminPanel: "Panneau d'administration",
    addDentist: "Ajouter un dentiste",
    editDentist: "Modifier le dentiste",
    deleteDentist: "Supprimer le dentiste",
    save: "Enregistrer",
    cancel: "Annuler",
    delete: "Supprimer",
    specialty: "Spécialité",
    city: "Ville",
    googleMapsLink: "Lien Google Maps",
    photoUrl: "URL de la photo",
    latitude: "Latitude",
    longitude: "Longitude",
    reviewsCount: "Nombre d'avis",
    
    // Messages
    errorLoading: "Erreur lors du chargement",
    successSaved: "Enregistré avec succès",
    successDeleted: "Supprimé avec succès",
    confirmDelete: "Êtes-vous sûr de vouloir supprimer ce dentiste ?",
  },
  en: {
    // Navigation
    home: "Home",
    dentists: "Dentists",
    admin: "Admin",
    
    // Hero
    heroTitle: "Find the Best Dentist Near You in Morocco",
    heroSubtitle: "Discover the best dentists near you. Check reviews, compare specialties and book appointments easily.",
    
    // Search
    searchPlaceholder: "Search for a dentist by name...",
    allCities: "All cities",
    allSpecialties: "All specialties",
    search: "Search",
    nearMe: "Near me",
    
    // Stats
    totalDentists: "Dentists",
    citiesCovered: "Cities",
    specialties: "Specialties",
    
    // Cards
    reviews: "reviews",
    call: "Call",
    directions: "Directions",
    website: "Website",
    viewDetails: "View details",
    
    // Detail Page
    contactInfo: "Contact Information",
    address: "Address",
    phone: "Phone",
    openingHours: "Opening Hours",
    location: "Location",
    quickActions: "Quick Actions",
    callNow: "Call now",
    getDirections: "Get directions",
    visitWebsite: "Visit website",
    addToFavorites: "Add to favorites",
    removeFromFavorites: "Remove from favorites",
    share: "Share",
    back: "Back",
    
    // Listings
    dentistsFound: "dentists found",
    dentistFound: "dentist found",
    noDentistsFound: "No dentists found with these criteria",
    tryModifyingFilters: "Try modifying your search filters",
    sortBy: "Sort by",
    rating: "Rating",
    name: "Name",
    distance: "Distance",
    gridView: "Grid",
    listView: "List",
    
    // Admin
    adminPanel: "Admin Panel",
    addDentist: "Add Dentist",
    editDentist: "Edit Dentist",
    deleteDentist: "Delete Dentist",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    specialty: "Specialty",
    city: "City",
    googleMapsLink: "Google Maps Link",
    photoUrl: "Photo URL",
    latitude: "Latitude",
    longitude: "Longitude",
    reviewsCount: "Reviews Count",
    
    // Messages
    errorLoading: "Error loading",
    successSaved: "Successfully saved",
    successDeleted: "Successfully deleted",
    confirmDelete: "Are you sure you want to delete this dentist?",
  },
  ar: {
    // Navigation
    home: "الرئيسية",
    dentists: "أطباء الأسنان",
    admin: "الإدارة",
    
    // Hero
    heroTitle: "ابحث عن أفضل طبيب أسنان بالقرب منك في المغرب",
    heroSubtitle: "اكتشف أفضل أطباء الأسنان بالقرب منك. تحقق من التقييمات، قارن التخصصات واحجز المواعيد بسهولة.",
    
    // Search
    searchPlaceholder: "ابحث عن طبيب أسنان بالاسم...",
    allCities: "جميع المدن",
    allSpecialties: "جميع التخصصات",
    search: "بحث",
    nearMe: "بالقرب مني",
    
    // Stats
    totalDentists: "أطباء الأسنان",
    citiesCovered: "المدن",
    specialties: "التخصصات",
    
    // Cards
    reviews: "تقييمات",
    call: "اتصل",
    directions: "الاتجاهات",
    website: "الموقع",
    viewDetails: "عرض التفاصيل",
    
    // Detail Page
    contactInfo: "معلومات الاتصال",
    address: "العنوان",
    phone: "الهاتف",
    openingHours: "ساعات العمل",
    location: "الموقع",
    quickActions: "إجراءات سريعة",
    callNow: "اتصل الآن",
    getDirections: "احصل على الاتجاهات",
    visitWebsite: "زيارة الموقع",
    addToFavorites: "إضافة إلى المفضلة",
    removeFromFavorites: "إزالة من المفضلة",
    share: "مشاركة",
    back: "رجوع",
    
    // Listings
    dentistsFound: "أطباء أسنان",
    dentistFound: "طبيب أسنان",
    noDentistsFound: "لم يتم العثور على أطباء أسنان بهذه المعايير",
    tryModifyingFilters: "حاول تعديل فلاتر البحث",
    sortBy: "ترتيب حسب",
    rating: "التقييم",
    name: "الاسم",
    distance: "المسافة",
    gridView: "شبكة",
    listView: "قائمة",
    
    // Admin
    adminPanel: "لوحة الإدارة",
    addDentist: "إضافة طبيب أسنان",
    editDentist: "تعديل طبيب الأسنان",
    deleteDentist: "حذف طبيب الأسنان",
    save: "حفظ",
    cancel: "إلغاء",
    delete: "حذف",
    specialty: "التخصص",
    city: "المدينة",
    googleMapsLink: "رابط خرائط جوجل",
    photoUrl: "رابط الصورة",
    latitude: "خط العرض",
    longitude: "خط الطول",
    reviewsCount: "عدد التقييمات",
    
    // Messages
    errorLoading: "خطأ في التحميل",
    successSaved: "تم الحفظ بنجاح",
    successDeleted: "تم الحذف بنجاح",
    confirmDelete: "هل أنت متأكد من حذف هذا الطبيب؟",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("fr");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.fr] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
