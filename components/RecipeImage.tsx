import Image from "next/image";

type RecipeImageProps = {
  imagePath: string;
  alt?: string;
  className: string;
};

const RecipeImage = ({ className, imagePath, alt }: RecipeImageProps) => {
  return (
    <Image
      className={className}
      src={
        process.env.NODE_ENV === "production"
          ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/recipe-images/${imagePath}`
          : `/img/${imagePath}`
      }
      alt={alt || "Recipe image"}
      sizes={"(max-width: 768px)"}
      fill={true}
    />
  );
};

export default RecipeImage;
