import React, { useRef, useState } from "react"
import {
  useCreateNewsMutation,
  useLazyGetAllNewsQuery,
} from "../../app/sevices/newsApi"
import { Controller, useForm } from "react-hook-form"

type createNews = {
  title: string
  text: string
  file?: File
  images?: File[]
}

export const CreateNews = () => {
  const [createNews] = useCreateNewsMutation()
  const [trigerAllNews] = useLazyGetAllNewsQuery()

  const { handleSubmit, control, setValue } = useForm<createNews>()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const imagesInputRef = useRef<HTMLInputElement | null>(null)

  const onFileButtonClick = () => {
    fileInputRef.current?.click()
  }

  const onImagesButtonClick = () => {
    imagesInputRef.current?.click()
  }
  const onSubmit = async (data: createNews) => {
    try {
      const formData = new FormData()
      console.log(data.title)
      console.log(data.text)

      formData.append("title", data.title)
      formData.append("text", data.text)

      if (data.file) {
        formData.append("file", data.file)
      }

      if (data.images && data.images.length > 0) {
        data.images.forEach(image => {
          formData.append("images", image)
        })
      }
      await createNews(formData).unwrap()

      setValue("title", "")
      setValue("text", "")
      setSelectedFile(null)
      setSelectedImages([])

      await trigerAllNews().unwrap()
    } catch (error) {
      console.error("Ошибка при создании новости:", error)
    }
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const file = files[0]
    setSelectedFile(file)
    setValue("file", file)
  }

  const onImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const filesArray = Array.from(files)
    setSelectedImages(filesArray)
    setValue("images", filesArray)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Controller
        name="title"
        control={control}
        rules={{
          required: "Обязательное поле",
        }}
        render={({ field }) => (
          <input
            {...field}
            placeholder="Заголовок"
            style={{ width: "30%" }}
          ></input>
        )}
      />
      <Controller
        name="text"
        control={control}
        rules={{
          required: "Обязательное поле",
        }}
        render={({ field }) => (
          <textarea
            {...field}
            placeholder="О чем думаете?"
            style={{ width: "50%" }}
          ></textarea>
        )}
      />
      {selectedFile && (
        <div>
          <h4>Выбранный файл:</h4>
          <p>{selectedFile.name}</p>
        </div>
      )}
      {selectedImages.length > 0 && (
        <div>
          <h4>Выбранные картинки:</h4>
          <div style={{ display: "flex", gap: 10 }}>
            {selectedImages.map((image, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(image)}
                alt={`preview-${idx}`}
                style={{ width: 100, height: 100, objectFit: "cover" }}
              />
            ))}
          </div>
        </div>
      )}
      <div className="" style={{ display: "flex", flexDirection: "row" }}>
        <button type="submit" style={{ width: "20%" }}>
          Добавить новость
        </button>
        <div className="">
          <button type="button" onClick={onFileButtonClick}>
            Файл
          </button>
          <button type="button" onClick={onImagesButtonClick}>
            Картинка
          </button>
        </div>
        <Controller
          name="file"
          control={control}
          render={({ field }) => (
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={onFileChange}
            />
          )}
        />
        <Controller
          name="images"
          control={control}
          render={({ field }) => (
            <input
              type="file"
              style={{ display: "none" }}
              multiple
              ref={imagesInputRef}
              accept="image/*"
              onChange={onImagesChange}
            />
          )}
        />
      </div>
    </form>
  )
}
