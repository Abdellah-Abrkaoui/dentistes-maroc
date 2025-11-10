import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { dentistsApi } from "@/lib/api";
import { Navbar } from "@/components/Navbar";
import { MapView } from "@/components/MapView";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFavorites } from "@/hooks/useFavorites";
import { 
  ArrowLeft, 
  Star, 
  Phone, 
  MapPin, 
  Clock, 
  ExternalLink, 
  Globe,
  Heart,
  Share2
} from "lucide-react";
import { toast } from "sonner";

export default function DentistDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();

  const { data: dentist, isLoading, error } = useQuery({
    queryKey: ["dentist", id],
    queryFn: () => dentistsApi.getById(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (error) {
      toast.error(t("errorLoading"));
    }
  }, [error, t]);

  const handleShare = async () => {
    if (navigator.share && dentist) {
      try {
        await navigator.share({
          title: dentist.name,
          text: `${dentist.name} - ${dentist.specialty} à ${dentist.city}`,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled or error occurred
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Lien copié !");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="mb-4 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("back")}
            </Button>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!dentist) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">{t("errorLoading")}</h2>
            <Button onClick={() => navigate("/dentists")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("back")}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("back")}
          </Button>
          
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-xl overflow-hidden bg-primary-foreground/10">
                {dentist.photoUrl ? (
                  <img 
                    src={dentist.photoUrl} 
                    alt={dentist.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary-foreground/20 text-primary-foreground text-4xl font-bold">
                    {dentist.name.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{dentist.name}</h1>
                <Badge variant="secondary" className="text-base px-3 py-1">
                  {dentist.specialty}
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-lg">
                <Star className="w-5 h-5 fill-accent text-accent" />
                <span className="font-semibold">{dentist.rating}</span>
                <span className="text-primary-foreground/80">({dentist.reviewsCount} {t("reviews")})</span>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFavorite(dentist._id!)}
                  className="gap-2 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Heart className={`w-4 h-4 ${isFavorite(dentist._id!) ? "fill-current" : ""}`} />
                  {isFavorite(dentist._id!) ? t("removeFromFavorites") : t("addToFavorites")}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="gap-2 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Share2 className="w-4 h-4" />
                  {t("share")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">{t("contactInfo")}</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{t("address")}</p>
                    <p className="text-muted-foreground">{dentist.address}</p>
                    <p className="text-muted-foreground">{dentist.city}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{t("phone")}</p>
                    <a 
                      href={`tel:${dentist.phone}`}
                      className="text-primary hover:underline"
                    >
                      {dentist.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{t("openingHours")}</p>
                    <p className="text-muted-foreground">{dentist.openingHours}</p>
                  </div>
                </div>

                {dentist.website && (
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{t("website")}</p>
                      <a 
                        href={dentist.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        {t("visitWebsite")}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">{t("location")}</h2>
              <MapView dentist={dentist} />
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="p-6 sticky top-4">
              <h3 className="text-xl font-semibold mb-4">{t("quickActions")}</h3>
              <div className="space-y-3">
                <Button 
                  className="w-full gap-2" 
                  size="lg"
                  onClick={() => window.location.href = `tel:${dentist.phone}`}
                >
                  <Phone className="w-5 h-5" />
                  {t("callNow")}
                </Button>
                
                {dentist.googleMapsLink && (
                  <Button 
                    variant="outline" 
                    className="w-full gap-2"
                    size="lg"
                    onClick={() => window.open(dentist.googleMapsLink, '_blank')}
                  >
                    <MapPin className="w-5 h-5" />
                    {t("getDirections")}
                  </Button>
                )}

                {dentist.website && (
                  <Button 
                    variant="outline" 
                    className="w-full gap-2"
                    size="lg"
                    onClick={() => window.open(dentist.website, '_blank')}
                  >
                    <Globe className="w-5 h-5" />
                    {t("visitWebsite")}
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
