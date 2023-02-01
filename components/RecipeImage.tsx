import { PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";

type RecipeImageProps = {
  imagePath: string;
  alt?: string;
  className: string;
};

const RecipeImage = ({ className, imagePath, alt }: RecipeImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const imageAlt = () => {
    if (isLoading) return "Loading...";

    return alt || "Recipe image";
  };

  if (process.env.NODE_ENV !== "production")
    return (
      <Image
        key={imagePath}
        className={
          isLoading
            ? `${className} flex animate-pulse items-center justify-center bg-gray-500/50 text-sm text-gray-200`
            : className
        }
        src={
          imagePath.startsWith("1")
            ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/recipe-images/${imagePath}`
            : `/img/${imagePath}`
        }
        alt={imageAlt()}
        sizes={"(max-width: 768px)"}
        fill={true}
        onLoad={() => setIsLoading(false)}
      />
    );

  return (
    <Image
      key={imagePath}
      className={
        isLoading
          ? `${className} flex animate-pulse items-center justify-center bg-gray-500/50 text-sm text-gray-200`
          : className
      }
      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/recipe-images/${imagePath}`}
      alt={imageAlt()}
      sizes={"(max-width: 768px)"}
      fill={true}
      onLoad={() => setIsLoading(false)}
    />
  );
};

export default RecipeImage;
