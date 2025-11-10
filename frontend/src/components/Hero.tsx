import { useLanguage } from "@/contexts/LanguageContext";

export const Hero = () => {
  const { t } = useLanguage();
  
  return (
    <div className="relative bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground py-16 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          {t("heroTitle")}
        </h1>
        <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
          {t("heroSubtitle")}
        </p>
      </div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
    </div>
  );
};
