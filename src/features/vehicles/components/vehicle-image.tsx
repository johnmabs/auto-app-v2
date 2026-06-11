import Image from "next/image";

type Props = {
  src?: string;
  alt: string;
};

export default function VehicleImage({ src, alt }: Props) {
  return (
    <div className="w-14 h-10 rounded-(--r) bg-(--bg-4) border border-(--border) overflow-hidden relative">
      <Image
        src={src ?? "/images/placeholders/vehicle-placeholder.webp"}
        alt={alt}
        fill
        /* sizes="(max-width: 768px) 100vw, 50vw" */
        className="object-cover"
        unoptimized
      />
    </div>
  );
}
