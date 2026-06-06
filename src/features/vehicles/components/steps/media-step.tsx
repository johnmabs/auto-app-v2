"use client";

import ImageUploadArea from "../image-upload-area";
import type {
  UploadedVehicleImage,
  VehicleFormState,
} from "../../types/vehicle-form.types";

type Props = {
  form: VehicleFormState;
  onChange: <K extends keyof VehicleFormState>(
    field: K,
    value: VehicleFormState[K],
  ) => void;
};

function normalizeImages(images: UploadedVehicleImage[]) {
  return images.map((image, index) => ({
    ...image,
    order: index,
    isPrimary: index === 0,
  }));
}

export function MediaStep({ form, onChange }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-[0.95rem] mb-5 pb-3 border-b border-(--border)">
        Photos du véhicule
      </h2>
      <ImageUploadArea
        images={form.images}
        onAdd={(images) =>
          onChange("images", normalizeImages([...form.images, ...images]))
        }
        onRemove={(i) =>
          onChange(
            "images",
            normalizeImages(form.images.filter((_, idx) => idx !== i)),
          )
        }
      />
      <p className="text-[0.72rem] text-(--dim)">
        La première image sera utilisée comme photo principale. Recommandé :
        minimum 4 photos.
      </p>
    </div>
  );
}
