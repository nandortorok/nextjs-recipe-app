import { useState } from "react";

import Image from "next/image";

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

  return (
    <Image
      key={imagePath}
      className={
        isLoading
          ? `${className} flex animate-pulse items-center justify-center bg-gray-500/50 text-sm text-gray-200`
          : className
      }
      src={`/img/${imagePath}`}
      alt={imageAlt()}
      sizes={"(max-width: 768px)"}
      fill={true}
      onLoad={() => setIsLoading(false)}
    />
  );
};

export default RecipeImage;
