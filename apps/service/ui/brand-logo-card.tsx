import Image from "next/image";

interface BrandLogoCardProps {
  alt: string;
  height: number;
  src: string;
  width: number;
}

export function BrandLogoCard({ src, alt, width, height }: BrandLogoCardProps) {
  return (
    <div className="flex max-h-48 items-center justify-center rounded-3xl bg-neutral-100 p-6 py-16">
      <Image alt={alt} height={height} src={src} width={width} />
    </div>
  );
}
