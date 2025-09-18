import Image from 'next/image';

interface BrandLogoCardProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export function BrandLogoCard({ src, alt, width, height }: BrandLogoCardProps) {
  return (
    <div className="flex max-h-48 items-center justify-center rounded-3xl bg-neutral-100 p-6 py-16">
      <Image src={src} alt={alt} width={width} height={height} />
    </div>
  );
}
