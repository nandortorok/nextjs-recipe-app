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

  if (process.env.NODE_ENV !== "production")
    return (
      <Image
        key={imagePath}
        className={className}
        src={
          imagePath.startsWith("1")
            ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/recipe-images/${imagePath}`
            : `/img/${imagePath}`
        }
        alt={alt || "Recipe image"}
        sizes={"(max-width: 768px)"}
        fill={true}
      />
    );

  return (
    <Image
      key={imagePath}
      className={
        isLoading
          ? `${className} flex animate-pulse items-center justify-center bg-gray-200 text-sm text-gray-500`
          : className
      }
      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/recipe-images/${imagePath}`}
      alt={alt || "Recipe image"}
      sizes={"(max-width: 768px)"}
      fill={true}
      onLoad={() => setIsLoading(false)}
    />
  );
};

export default RecipeImage;
