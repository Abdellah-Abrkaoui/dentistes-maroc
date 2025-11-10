import { Dentist } from "@/types/dentist";
import { useLanguage } from "@/contexts/LanguageContext";
import { Users, MapPin, Stethoscope } from "lucide-react";

interface StatsProps {
  dentists: Dentist[];
}

export const Stats = ({ dentists }: StatsProps) => {
  const { t } = useLanguage();

  const totalDentists = dentists.length;
  const cities = [...new Set(dentists.map((d) => d.city))].length;
  const specialties = [...new Set(dentists.map((d) => d.specialty))].length;

  const stats = [
    {
      icon: Users,
      value: totalDentists,
      label: t("totalDentists"),
    },
    {
      icon: MapPin,
      value: cities,
      label: t("citiesCovered"),
    },
    {
      icon: Stethoscope,
      value: specialties,
      label: t("specialties"),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-card rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-3">
              <Icon className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">
              {stat.value}+
            </div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
};
