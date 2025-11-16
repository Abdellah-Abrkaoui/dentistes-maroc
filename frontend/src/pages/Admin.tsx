import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { dentistsApi } from "@/lib/api";
import { Dentist } from "@/types/dentist";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { auth } from "@/firebase/firebase";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export default function Admin() {
  const { t } = useLanguage();
  const queryClient = useQueryClient();
  const [editingDentist, setEditingDentist] = useState<Dentist | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Dentist>>({
    name: "",
    specialty: "",
    address: "",
    city: "",
    phone: "",
    rating: 5,
    reviewsCount: 0,
    latitude: 0,
    longitude: 0,
    website: "",
    googleMapsLink: "",
    openingHours: "",
    photoUrl: "",
  });

  const { data: dentists = [], isLoading } = useQuery<Dentist[]>({
    queryKey: ["dentists"],
    queryFn: dentistsApi.getAll,
  });

  const createMutation = useMutation({
    mutationFn: async (data: Partial<Dentist>) => {
      const token = await auth.currentUser?.getIdToken();

      const response = await fetch(`${API_BASE_URL}/dentists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to create dentist");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dentists"] });
      toast.success(t("successSaved"));
      setIsDialogOpen(false);
      resetForm();
    },
    onError: () => {
      toast.error(t("errorLoading"));
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Dentist>;
    }) => {
      const token = await auth.currentUser?.getIdToken();

      const response = await fetch(`${API_BASE_URL}/dentists/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update dentist");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dentists"] });
      toast.success(t("successSaved"));
      setIsDialogOpen(false);
      resetForm();
    },
    onError: () => {
      toast.error(t("errorLoading"));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const token = await auth.currentUser?.getIdToken();

      const response = await fetch(`${API_BASE_URL}/dentists/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete dentist");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dentists"] });
      toast.success(t("successDeleted"));
    },
    onError: () => {
      toast.error(t("errorLoading"));
    },
  });

  const resetForm = () => {
    setFormData({
      name: "",
      specialty: "",
      address: "",
      city: "",
      phone: "",
      rating: 5,
      reviewsCount: 0,
      latitude: 0,
      longitude: 0,
      website: "",
      googleMapsLink: "",
      openingHours: "",
      photoUrl: "",
    });
    setEditingDentist(null);
  };

  const handleEdit = (dentist: Dentist) => {
    setEditingDentist(dentist);
    setFormData(dentist);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDentist) {
      updateMutation.mutate({ id: editingDentist._id!, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-8 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{t("adminPanel")}</h1>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="gap-2">
                <Plus className="w-4 h-4" />
                {t("addDentist")}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingDentist ? t("editDentist") : t("addDentist")}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("name")}</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialty">{t("specialty")}</Label>
                    <Input
                      id="specialty"
                      required
                      value={formData.specialty}
                      onChange={(e) =>
                        setFormData({ ...formData, specialty: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">{t("city")}</Label>
                    <Input
                      id="city"
                      required
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("phone")}</Label>
                    <Input
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">{t("address")}</Label>
                    <Input
                      id="address"
                      required
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rating">{t("rating")}</Label>
                    <Input
                      id="rating"
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      required
                      value={formData.rating}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          rating: parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reviewsCount">{t("reviewsCount")}</Label>
                    <Input
                      id="reviewsCount"
                      type="number"
                      min="0"
                      required
                      value={formData.reviewsCount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          reviewsCount: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="latitude">{t("latitude")}</Label>
                    <Input
                      id="latitude"
                      type="number"
                      step="any"
                      required
                      value={formData.latitude}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          latitude: parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="longitude">{t("longitude")}</Label>
                    <Input
                      id="longitude"
                      type="number"
                      step="any"
                      required
                      value={formData.longitude}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          longitude: parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="openingHours">{t("openingHours")}</Label>
                    <Input
                      id="openingHours"
                      required
                      value={formData.openingHours}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          openingHours: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="website">{t("website")}</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) =>
                        setFormData({ ...formData, website: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="googleMapsLink">
                      {t("googleMapsLink")}
                    </Label>
                    <Input
                      id="googleMapsLink"
                      type="url"
                      value={formData.googleMapsLink}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          googleMapsLink: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="photoUrl">{t("photoUrl")}</Label>
                    <Input
                      id="photoUrl"
                      type="url"
                      value={formData.photoUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, photoUrl: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false);
                      resetForm();
                    }}
                  >
                    {t("cancel")}
                  </Button>
                  <Button type="submit">{t("save")}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dentists.map((dentist) => (
              <Card key={dentist._id} className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{dentist.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {dentist.specialty}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {dentist.city}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEdit(dentist)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            {t("deleteDentist")}
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            {t("confirmDelete")}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteMutation.mutate(dentist._id!)}
                          >
                            {t("delete")}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
