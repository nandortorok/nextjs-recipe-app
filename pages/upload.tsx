import { NextPage } from "next"
import Head from "next/head"

const Upload: NextPage = () => {
  return (
    <>
      <Head>
        <title>Recipe Website | Upload</title>
      </Head>
      <main className="px-4 pb-10">
        <div className="mt-8 mx-auto w-full max-w-xl bg-white px-10 shadow mb-0 space-y-6">
          <h1 className="text-2xl font-bold text-center pt-5">
            Upload a recipe
          </h1>
          {/* Title & Image */}
          <section className="border-b space-y-4 pb-6">
            <UploadInput 
              label="Title"
              type="text"
              placeholder="Recipe title"
            />
            <UploadInput 
              label="Image"
              type="file"
              placeholder="Recipe image"
            />
          </section>
          {/* Servings */}
          <section className="border-b space-y-4 pb-6">
            <UploadInput 
              label="Servings"
              type="number"
              placeholder="e.g. 4"
            />
          </section>
          {/* Prep & Cook time */}
          <section className="border-b space-y-4 pb-6">
            <UploadSelect 
              label="Perp Time"
            />
            <UploadSelect 
              label="Cook Time"
            />
            
            <div className="flex space-x-4 items-center">
              <label className="block font-bold pb-1 flex-1 w-full">
                Total Time
              </label>
              <input 
                className="w-1/6 border-white"
                type="text"
                placeholder="0" 
                disabled={true}
              />
              <select
                className="w-1/2 invisible"
                name="" 
                id=""
              >
              </select>
            </div>
          </section>
          {/* Ingredients */}
          <section className="border-b space-y-4 pb-6">
            <h1 className="text-md font-bold">
              Ingredients
            </h1>
            <input
              className="w-full"
              placeholder="e.g. egg" 
              type="text" 
            />
            <input
              className="w-full"
              placeholder="e.g. egg" 
              type="text" 
            />
            <input
              className="w-full"
              placeholder="e.g. egg" 
              type="text" 
            />
          </section>
          {/* Directions */}
          <section className="border-b space-y-4 pb-6">
            <h1 className="text-md font-bold">
              Ingredients
            </h1>
            <div>
              <label className="block font-bold pb-2">
                Step 1
              </label>
              <textarea
                className="w-full"
                rows={4}
              />
            </div>
            <div>
              <label className="block font-bold pb-2">
                Step 2
              </label>
              <textarea
                className="w-full"
                rows={4}
              />
            </div>
            <div>
              <label className="block font-bold pb-2">
                Step 3
              </label>
              <textarea
                className="w-full"
                rows={4}
              />
            </div>
          </section>
        </div>
  
      </main>
    </>
  )
}

// UploadInput
type InputProps = {
  label: string
  type: string,
  placeholder: string,
}

const UploadInput = ({ label, type, placeholder }: InputProps) => {
  return (
    <div>
      <label className="block font-bold pb-2">
        {label}
      </label>
      <input
        className="w-full border"
        type={type}
        placeholder={placeholder}
      />
    </div>
  )
}

// UploadSelect
type SelectProps = {
  label: string
}

const UploadSelect = ({ label }: SelectProps) => {
  return (
    <div className="flex space-x-4 items-center">
      <label className="block font-bold pb-1 flex-1">
        {label}
      </label>
      <input 
        className="w-1/6"
        type="number"
        placeholder="0" 
      />
      <select
        className="w-1/2"
      >
        <option value="1">minutes</option>
        <option value="2">hours</option>
        <option value="3">days</option>
      </select>
    </div>
  )
}

export default Upload