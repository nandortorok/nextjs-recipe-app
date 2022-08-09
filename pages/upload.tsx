import { NextPage } from "next"

const Upload: NextPage = () => {
  return (
    <main className="container mx-auto px-4">
      {/* Title */}
      <h1 className="py-10 text-center text-4xl font-bold">Upload a recipe</h1>
      {/* Form */}
      <form className="flex flex-col items-center">
        {/* Title */}
        <UploadInput 
          type="text" 
          placeholder="Title"
        />
        {/* Prep, cook time, servings */}
        <UploadInput 
          type="number" 
          placeholder="0"
        />
        <UploadInput 
          type="number" 
          placeholder="0"
        />
        {/* Ingredients ( ammount unit ingredient ) */}
        {/* Directions (recipe steps) */}
      </form>
    </main>
  )
}


type Props = {
  type: string,
  placeholder: string
}

const UploadInput = ({ type, placeholder }: Props) => {
  return (
    <>
    <label className="self">
      {placeholder}
    </label>
    <input
      className="w-1/4"
      placeholder={placeholder}
      type={type}
    />
    </>
  )
}

export default Upload