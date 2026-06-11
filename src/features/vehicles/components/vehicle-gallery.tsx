"use client";

import type { ButtonHTMLAttributes } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageOff, ZoomIn, X } from "lucide-react";

import { cn } from "@/lib/utils";

type GalleryImage = {
  id: string;
  url: string;
  alt: string | null;
  order: number;
  isPrimary: boolean;
};

type VehicleGalleryProps = {
  images: GalleryImage[];
  vehicleName: string;
};

type GalleryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "overlay" | "lightbox";
};

function sortImages(images: GalleryImage[]) {
  return [...images].sort((a, b) => {
    if (a.isPrimary !== b.isPrimary) {
      return a.isPrimary ? -1 : 1;
    }

    return a.order - b.order;
  });
}

function getImageAlt(image: GalleryImage, vehicleName: string, index: number) {
  return image.alt?.trim() || `${vehicleName} - photo ${index + 1}`;
}

function GalleryButton({
  className,
  variant = "overlay",
  type = "button",
  ...props
}: GalleryButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-full transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--gold)",
        variant === "overlay" &&
          "bg-black/60 text-white backdrop-blur-sm hover:bg-(--gold) hover:text-(--bg)",
        variant === "lightbox" &&
          "bg-white/10 text-white backdrop-blur-sm hover:bg-white/20",
        className,
      )}
      {...props}
    />
  );
}

function EmptyGallery() {
  return (
    <div className="flex h-105 items-center justify-center rounded-(--r-lg) border border-(--border) bg-(--bg-3)">
      <ImageOff className="h-12 w-12 text-(--dim)" aria-hidden="true" />
      <span className="sr-only">Aucune photo disponible</span>
    </div>
  );
}

export function VehicleGallery({ images, vehicleName }: VehicleGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const sortedImages = useMemo(() => sortImages(images), [images]);
  const totalImages = sortedImages.length;
  const safeIndex =
    totalImages === 0 ? 0 : Math.min(currentIndex, totalImages - 1);
  const currentImage = sortedImages[safeIndex];
  const hasMultipleImages = totalImages > 1;

  const goToImage = useCallback(
    (index: number) => {
      if (totalImages === 0) {
        return;
      }

      setCurrentIndex((index + totalImages) % totalImages);
    },
    [totalImages],
  );

  const showPrevious = useCallback(() => {
    goToImage(safeIndex - 1);
  }, [goToImage, safeIndex]);

  const showNext = useCallback(() => {
    goToImage(safeIndex + 1);
  }, [goToImage, safeIndex]);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  useEffect(() => {
    if (!lightboxOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft" && hasMultipleImages) {
        showPrevious();
      }

      if (event.key === "ArrowRight" && hasMultipleImages) {
        showNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeLightbox, hasMultipleImages, lightboxOpen, showNext, showPrevious]);

  if (!currentImage) {
    return <EmptyGallery />;
  }

  return (
    <>
      <section aria-label={`Photos de ${vehicleName}`}>
        <div
          className={cn(
            "group relative h-105 overflow-hidden rounded-(--r-lg)",
            "border border-(--border) bg-(--bg-3)",
          )}
        >
          <Image
            src={currentImage.url}
            alt={getImageAlt(currentImage, vehicleName, safeIndex)}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover"
            priority
            unoptimized
          />

          <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[0.7rem] text-white backdrop-blur-sm">
            {safeIndex + 1} / {totalImages}
          </div>

          <GalleryButton
            onClick={() => setLightboxOpen(true)}
            className="absolute bottom-3 right-3 h-9 w-9 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
            aria-label="Agrandir l'image"
          >
            <ZoomIn className="h-4 w-4" aria-hidden="true" />
          </GalleryButton>

          {hasMultipleImages && (
            <>
              <GalleryButton
                onClick={showPrevious}
                className="absolute left-3 top-1/2 h-9 w-9 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                aria-label="Photo précédente"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </GalleryButton>

              <GalleryButton
                onClick={showNext}
                className="absolute right-3 top-1/2 h-9 w-9 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                aria-label="Photo suivante"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </GalleryButton>
            </>
          )}
        </div>

        {hasMultipleImages && (
          <div
            className="mt-3 flex gap-2.5 overflow-x-auto pb-1"
            aria-label="Vignettes de photos"
          >
            {sortedImages.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => goToImage(index)}
                aria-current={index === safeIndex}
                aria-label={`Afficher la photo ${index + 1}`}
                className={cn(
                  "relative h-14.5 w-20.5 shrink-0 overflow-hidden rounded-(--r)",
                  "border-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--gold)",
                  index === safeIndex
                    ? "border-(--gold) shadow-gold"
                    : "border-(--border) opacity-60 hover:border-(--border-2) hover:opacity-100",
                )}
              >
                <Image
                  src={image.url}
                  alt={image.alt?.trim() || `Vignette ${index + 1}`}
                  fill
                  sizes="82px"
                  className="object-cover"
                  unoptimized
                />
              </button>
            ))}
          </div>
        )}
      </section>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Visionneuse - ${vehicleName}`}
          onClick={closeLightbox}
        >
          <GalleryButton
            variant="lightbox"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 h-10 w-10"
            aria-label="Fermer la visionneuse"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </GalleryButton>

          <div className="absolute left-1/2 top-4 -translate-x-1/2 font-mono text-[0.8rem] text-white/60">
            {safeIndex + 1} / {totalImages}
          </div>

          <div
            className="relative mx-4 aspect-video max-h-[85vh] w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={currentImage.url}
              alt={getImageAlt(currentImage, vehicleName, safeIndex)}
              fill
              sizes="100vw"
              className="object-contain"
              unoptimized
            />
          </div>

          {hasMultipleImages && (
            <>
              <GalleryButton
                variant="lightbox"
                onClick={(event) => {
                  event.stopPropagation();
                  showPrevious();
                }}
                className="absolute left-4 h-12 w-12"
                aria-label="Photo précédente"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
              </GalleryButton>

              <GalleryButton
                variant="lightbox"
                onClick={(event) => {
                  event.stopPropagation();
                  showNext();
                }}
                className="absolute right-4 h-12 w-12"
                aria-label="Photo suivante"
              >
                <ChevronRight className="h-6 w-6" aria-hidden="true" />
              </GalleryButton>
            </>
          )}
        </div>
      )}
    </>
  );
}
