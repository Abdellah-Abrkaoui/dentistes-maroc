import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCity: string;
  onCityChange: (value: string) => void;
  selectedSpecialty: string;
  onSpecialtyChange: (value: string) => void;
  cities: string[];
  specialties: string[];
}

export const SearchFilters = ({
  searchTerm,
  onSearchChange,
  selectedCity,
  onCityChange,
  selectedSpecialty,
  onSpecialtyChange,
  cities,
  specialties,
}: SearchFiltersProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder={t("searchPlaceholder")}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-12 text-lg"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select value={selectedCity} onValueChange={onCityChange}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder={t("allCities")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allCities")}</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedSpecialty} onValueChange={onSpecialtyChange}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder={t("allSpecialties")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allSpecialties")}</SelectItem>
            {specialties.map((specialty) => (
              <SelectItem key={specialty} value={specialty}>
                {specialty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
