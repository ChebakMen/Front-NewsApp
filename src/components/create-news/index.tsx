import React, { useRef, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useCreateNewsMutation } from "../../app/sevices/newsApi"
import ReactMarkdown from "react-markdown"
import { News } from "../../app/types"
import style from "./style.module.scss"
import { useNavigate } from "react-router-dom"

type CreateNewsForm = {
  title: string
  text: string
  file?: File | null
  image?: File | null
}

export const CreateNews = () => {
  const { control, handleSubmit, watch, setValue, reset } =
    useForm<CreateNewsForm>({})

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [dataNewsForCreate] = useState<News>({
    _id: "123",
    title: "",
    text: "",
    author: { _id: "", email: "", password: "", name: "You" },
    createdAt: new Date(),
    isPublished: "Не опубликована",
  })

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const imageInputRef = useRef<HTMLInputElement | null>(null)

  const [createNews] = useCreateNewsMutation()
  const navigate = useNavigate()

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files
      if (file && file.length > 0) {
        setSelectedFile(file[0])
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files
      if (file && file.length > 0) {
        setSelectedImage(file[0])
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onSubmit = async (data: CreateNewsForm) => {
    try {
      const btn_submit = document.getElementById(
        "btn_submit",
      ) as HTMLButtonElement | null
      if (btn_submit) {
        btn_submit.disabled = true
      }

      const formData = new FormData()
      formData.append("title", data.title)
      formData.append("text", data.text)

      if (selectedFile) {
        formData.append("file", selectedFile)
      }
      if (selectedImage) {
        formData.append("image", selectedImage)
      }

      await createNews(formData).unwrap()
      navigate("/allNews")

      reset()
      setValue("file", null)
      setValue("image", null)
      setValue("title", "")
      setValue("text", "")
    } catch (error) {
      console.error("Ошибка при создании новости:", error)
    }
  }

  const handleDeleteFile = () => {
    setSelectedFile(null)
  }
  const handleDeleteImage = () => {
    setSelectedImage(null)
  }

  const dateConvert = (date: Date | undefined) => {
    if (!date) return ""
    const dateObj = typeof date === "string" ? new Date(date) : date
    return dateObj.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "15px",
        }}
      >
        <Controller
          name="title"
          control={control}
          rules={{ required: "Обязательное поле" }}
          render={({ field, fieldState }) => (
            <>
              <input
                {...field}
                className={style.new_input_title}
                placeholder="Заголовок"
                style={{ width: "30%" }}
              />
              {fieldState.error && (
                <p style={{ color: "red" }}>{fieldState.error.message}</p>
              )}
            </>
          )}
        />

        <Controller
          name="text"
          control={control}
          rules={{ required: "Обязательное поле" }}
          render={({ field }) => (
            <>
              <textarea
                {...field}
                name="text"
                className={style.new_input_text}
                placeholder="Ваш текст для статьи"
                rows={10}
                style={{ width: "100%" }}
              />
            </>
          )}
        />

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button
            type="submit"
            id="btn_submit"
            className={style.button}
            style={{ width: "20%" }}
          >
            Добавить новость
          </button>

          <div>
            <button
              type="button"
              className={style.button}
              onClick={() => fileInputRef.current?.click()}
            >
              Выбрать файл
            </button>
            <Controller
              name="file"
              control={control}
              render={() => (
                <input
                  type="file"
                  name="file"
                  hidden
                  ref={fileInputRef}
                  accept=".doc, .docx, .pdf, .gif"
                  onChange={onFileChange}
                />
              )}
            />

            <button
              type="button"
              className={style.button}
              onClick={() => imageInputRef.current?.click()}
            >
              Выбрать картинку
            </button>
            <Controller
              name="image"
              control={control}
              render={() => (
                <input
                  type="file"
                  name="image"
                  hidden
                  accept="image/png, image/jpeg, image/jpeg"
                  ref={imageInputRef}
                  onChange={onImageChange}
                />
              )}
            />
          </div>
        </div>
      </form>
      <div className={style.news_container}>
        {selectedImage && (
          <div className="">
            <img
              src={URL.createObjectURL(selectedImage)}
              className={style.news_image}
            />
            <button
              type="button"
              onClick={handleDeleteImage}
              style={{ position: "absolute", top: "0", right: "0" }}
            >
              X
            </button>
          </div>
        )}
        <div
          className={style.news_wrapper}
          style={
            selectedImage
              ? { borderRadius: "0 0 20px 20px", marginTop: "-4px" }
              : { borderRadius: "20px", marginTop: "0px" }
          }
        >
          <div>
            <h2 className={style.news_title}>{watch("title")}</h2>
            <ReactMarkdown>{watch("text")}</ReactMarkdown>
            <div className={style.bottom_block}>
              <div
                className=""
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <h4 className={style.news_text}>
                  {dateConvert(dataNewsForCreate?.createdAt)}
                </h4>
                <h4 className={style.news_textuser}>
                  Автор: {dataNewsForCreate?.author.name}
                </h4>
                <h4 className={style.news_text}>
                  Статус: {dataNewsForCreate?.isPublished}
                </h4>
              </div>
            </div>
          </div>
        </div>
        {selectedFile && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ccc",
              borderRadius: 15,
              padding: "8px 12px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              backgroundColor: "#fafafa",
              fontFamily: "Arial, sans-serif",
              margin: "10px 0",
            }}
          >
            <div
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                fontWeight: "bold",
                height: "50px",
                borderRadius: 10,
                padding: "6px 10px",
                minWidth: 50,
                textAlign: "center",
                marginRight: 15,
                userSelect: "none",
              }}
            ></div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h4
                  style={{
                    fontSize: 16,
                    margin: "4px 0 ",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    flexGrow: 1,
                  }}
                >
                  Выбранный файл:
                </h4>
                <a
                  href={URL.createObjectURL(selectedFile)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 16,
                    color: "black",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    flexGrow: 1,
                  }}
                >
                  {selectedFile.name}
                </a>
              </div>
              <button type="button" onClick={handleDeleteFile}>
                X
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
