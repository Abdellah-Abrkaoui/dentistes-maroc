import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Phone, MapPin, Clock, ExternalLink } from "lucide-react";
import { Dentist } from "@/types/dentist";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface DentistCardProps {
  dentist: Dentist;
}

export const DentistCard = ({ dentist }: DentistCardProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group">
      <div 
        onClick={() => navigate(`/dentist/${dentist._id}`)}
        className="flex flex-col sm:flex-row gap-4 p-6"
      >
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted">
            {dentist.photoUrl ? (
              <img 
                src={dentist.photoUrl} 
                alt={dentist.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-2xl font-bold">
                {dentist.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 space-y-3">
          <div>
            <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {dentist.name}
            </h3>
            <Badge variant="secondary" className="mt-1">
              {dentist.specialty}
            </Badge>
          </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-accent text-accent" />
                <span className="font-semibold text-foreground">{dentist.rating}</span>
                <span>({dentist.reviewsCount} {t("reviews")})</span>
              </div>
            </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{dentist.address}, {dentist.city}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span>{dentist.openingHours}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <Button
              size="sm"
              variant="default"
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `tel:${dentist.phone}`;
              }}
              className="gap-2"
            >
              <Phone className="w-4 h-4" />
              {t("call")}
            </Button>
            {dentist.googleMapsLink && (
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(dentist.googleMapsLink, '_blank');
                }}
                className="gap-2"
              >
                <MapPin className="w-4 h-4" />
                {t("directions")}
              </Button>
            )}
            {dentist.website && (
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(dentist.website, '_blank');
                }}
                className="gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                {t("website")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
