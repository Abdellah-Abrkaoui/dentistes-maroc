import { useQuery } from "@tanstack/react-query";
import { dentistsApi } from "@/lib/api";
import { Dentist } from "@/types/dentist";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturedDentists } from "@/components/FeaturedDentists";
import { Stats } from "@/components/Stats";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const { data: dentists = [], isLoading } = useQuery<Dentist[]>({
    queryKey: ["dentists"],
    queryFn: dentistsApi.getAll,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      
      <div className="py-12 space-y-16">
        {/* Stats Section */}
        <div className="container">
          {!isLoading && <Stats dentists={dentists} />}
        </div>

        {/* Featured Dentists Carousel */}
        {!isLoading && dentists.length > 0 && (
          <div className="container">
            <FeaturedDentists dentists={dentists} />
          </div>
        )}

        {/* CTA Section */}
        <div className="container text-center space-y-6">
          <h2 className="text-3xl font-bold">{t("heroTitle")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("heroSubtitle")}
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/dentists")}
            className="gap-2"
          >
            {t("search")}
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
