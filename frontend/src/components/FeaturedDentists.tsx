import { Dentist } from "@/types/dentist";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Phone, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface FeaturedDentistsProps {
  dentists: Dentist[];
}

export const FeaturedDentists = ({ dentists }: FeaturedDentistsProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Get top-rated dentists
  const featured = dentists
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  if (featured.length === 0) return null;

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">
        {t("en") === "Featured Dentists" ? "Dentistes Vedettes" : "Featured Dentists"}
      </h2>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {featured.map((dentist) => (
            <CarouselItem key={dentist._id} className="md:basis-1/2 lg:basis-1/3">
              <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group h-full">
                <div onClick={() => navigate(`/dentist/${dentist._id}`)} className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      {dentist.photoUrl ? (
                        <img 
                          src={dentist.photoUrl} 
                          alt={dentist.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-xl font-bold">
                          {dentist.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate group-hover:text-primary transition-colors">
                        {dentist.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{dentist.specialty}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        <span className="text-sm font-semibold">{dentist.rating}</span>
                        <span className="text-xs text-muted-foreground">({dentist.reviewsCount})</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{dentist.city}</span>
                  </div>

                  <Button
                    size="sm"
                    className="w-full gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `tel:${dentist.phone}`;
                    }}
                  >
                    <Phone className="w-4 h-4" />
                    {t("call")}
                  </Button>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
};
