import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Dentist } from "@/types/dentist";

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface MapViewProps {
  dentist: Dentist;
}

export const MapView = ({ dentist }: MapViewProps) => {
  if (!dentist.latitude || !dentist.longitude) {
    return (
      <div className="aspect-video rounded-lg overflow-hidden bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">Location not available</p>
      </div>
    );
  }

  return (
    <div className="aspect-video rounded-lg overflow-hidden">
      <MapContainer
        center={[dentist.latitude, dentist.longitude]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[dentist.latitude, dentist.longitude]}>
          <Popup>
            <div className="text-center">
              <strong>{dentist.name}</strong>
              <br />
              {dentist.address}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
