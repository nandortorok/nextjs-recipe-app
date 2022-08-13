import { NextPage } from "next"

const Upload: NextPage = () => {
  return (
    <main className="container mx-auto px-4">
      {/* Title */}
      <h1 className="py-10 text-center text-4xl font-bold">Upload a recipe</h1>
      {/* Form */}
      <form className="flex flex-col items-center space-y-3 pb-10 shadow-2xl">
        {/* Title */}
        <UploadInput 
          label="Recipe Title"
          placeholder="Title"
          type="text" 
        />
        {/* Prep, cook time, servings */}
        <UploadSelect 
          label="Prep Time"
          children={
            <select name="" id="">
              <option value="1">minutes</option>
              <option value="2">hours</option>
              <option value="3">days</option>
            </select>
          }
        />  
        <UploadSelect 
          label="Cook Time"
          children={
            <select name="" id="">
              <option value="1">minutes</option>
              <option value="2">hours</option>
              <option value="3">days</option>
            </select>
          }
        />

        {/* Ingredients ( ammount unit ingredient ) */}
        {/* Directions (recipe steps) */}
      </form>
    </main>
  )
}

// UploadInput
type InputProps = {
  label?: string
  placeholder: string,
  type: string,
}

const UploadInput = ({ label, placeholder, type }: InputProps) => {
  return (
    <>
    <label className="font-bold">
      {label}
    </label>
    <input
      className="w-1/4"
      placeholder={placeholder}
      type={type}
    />
    </>
  )
}

type SelectProps = {
  label: string,
  children: JSX.Element
}

const UploadSelect = ({ label, children }: SelectProps) => {
  return (
    <section className="flex space-x-3 justify-center items-center w-1/4 border-b pb-4">
      <UploadInput 
        label={label}
        placeholder="0"
        type="number" 
      />
      {children}
    </section>
  )
}

export default Upload