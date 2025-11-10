import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { dentistsApi } from "@/lib/api";
import { Dentist } from "@/types/dentist";
import { Navbar } from "@/components/Navbar";
import { SearchFilters } from "@/components/SearchFilters";
import { DentistCard } from "@/components/DentistCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useGeolocation, calculateDistance } from "@/hooks/useGeolocation";
import { Grid, List, MapPin } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DentistsListing() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [sortBy, setSortBy] = useState<"rating" | "name" | "distance">("rating");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const { latitude, longitude, getLocation, loading: locationLoading } = useGeolocation();

  const { data: dentists = [], isLoading, error } = useQuery<Dentist[]>({
    queryKey: ["dentists"],
    queryFn: dentistsApi.getAll,
  });

  useEffect(() => {
    if (error) {
      toast.error(t("errorLoading"));
    }
  }, [error, t]);

  const cities = useMemo(() => {
    const uniqueCities = [...new Set(dentists.map((d) => d.city))];
    return uniqueCities.sort();
  }, [dentists]);

  const specialties = useMemo(() => {
    const uniqueSpecialties = [...new Set(dentists.map((d) => d.specialty))];
    return uniqueSpecialties.sort();
  }, [dentists]);

  const filteredAndSortedDentists = useMemo(() => {
    let filtered = dentists.filter((dentist) => {
      const matchesSearch = dentist.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCity =
        selectedCity === "all" || dentist.city === selectedCity;
      const matchesSpecialty =
        selectedSpecialty === "all" || dentist.specialty === selectedSpecialty;

      return matchesSearch && matchesCity && matchesSpecialty;
    });

    // Sort
    if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "distance" && latitude && longitude) {
      filtered.sort((a, b) => {
        const distA = calculateDistance(latitude, longitude, a.latitude, a.longitude);
        const distB = calculateDistance(latitude, longitude, b.latitude, b.longitude);
        return distA - distB;
      });
    }

    return filtered;
  }, [dentists, searchTerm, selectedCity, selectedSpecialty, sortBy, latitude, longitude]);

  const handleNearMe = () => {
    if (!latitude || !longitude) {
      getLocation();
      toast.info("Requesting your location...");
    } else {
      setSortBy("distance");
      toast.success("Sorted by distance from your location");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-8 space-y-8">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-3xl font-bold">{t("dentists")}</h1>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleNearMe}
                disabled={locationLoading}
                className="gap-2"
              >
                <MapPin className="w-4 h-4" />
                {t("nearMe")}
              </Button>

              <div className="flex items-center gap-1 border rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="h-8 w-8"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="h-8 w-8"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <SearchFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCity={selectedCity}
            onCityChange={setSelectedCity}
            selectedSpecialty={selectedSpecialty}
            onSpecialtyChange={setSelectedSpecialty}
            cities={cities}
            specialties={specialties}
          />

          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              {filteredAndSortedDentists.length}{" "}
              {filteredAndSortedDentists.length === 1 ? t("dentistFound") : t("dentistsFound")}
            </p>

            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t("sortBy")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">{t("rating")}</SelectItem>
                <SelectItem value="name">{t("name")}</SelectItem>
                <SelectItem value="distance" disabled={!latitude || !longitude}>
                  {t("distance")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        ) : filteredAndSortedDentists.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">
              {t("noDentistsFound")}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {t("tryModifyingFilters")}
            </p>
          </div>
        ) : (
          <div className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              : "space-y-4"
          }>
            {filteredAndSortedDentists.map((dentist) => (
              <DentistCard key={dentist._id} dentist={dentist} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
