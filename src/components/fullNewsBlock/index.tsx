import React, { useEffect } from "react"

import style from "./style.module.scss"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import {
  deleteNews,
  useDeleteNewsMutation,
  useGetNewsByIdQuery,
} from "../../app/sevices/newsApi"
import { setNews } from "../../features/news/newsSlice"
import { useNavigate, useParams } from "react-router-dom"

export const FullNewsBlock = () => {
  const params = useParams<{ id: string }>()
  const id = params.id
  if (!id) {
    return <div>News ID not found</div>
  }

  const { data: news } = useGetNewsByIdQuery({ id })
  const [deleteNews] = useDeleteNewsMutation()
  const user = useSelector((state: RootState) => state.auth.user)
  const navigate = useNavigate()
  const isEditNews = user?._id === news?.authorId

  const imageUrl =
    "https://resizer.mail.ru/p/c2631098-aaf3-5a49-934d-dcb15e29355a/AQAKvaSf6g3q55IuLjoTtCsahNWTGl2LTQoonhDwyj7Ynv3-veKTaMiP3yKtrl0WawOk5fP59EXlUXXOoKi-ltIzGTQ.jpg"

  const dateConvert = (date: Date | undefined) => {
    if (!date) return ""
    const dateObj = typeof date === "string" ? new Date(date) : date
    return dateObj.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const onClickRemoveNews = async (id: string) => {
    try {
      console.log(id)
      await deleteNews({ id }).unwrap()
      navigate("/")
    } catch (err) {
      console.error("Ошибка при удалении новости:", err)
    }
  }

  return (
    <div className={style.news_container}>
      {imageUrl && (
        <img src={imageUrl} className={style.news_image} alt={news?.title} />
      )}
      <div
        className={style.news_wrapper}
        style={
          imageUrl
            ? { borderRadius: "0 0 20px 20px", marginTop: "-4px" }
            : { borderRadius: "20px", marginTop: "0px" }
        }
      >
        <div>
          <h2 className={style.news_title}>{news?.title}</h2>
          <h4 className={style.news_text}>
            Hey there! 👋 I'm starting a new series called Roast the Code, where
            I will share some code, and let YOU roast and improve it. There's
            not much more to it, just be polite and constructive, this is an
            exercise so we can all learn together. Now then, head over to the
            repo and roast as hard as you can"
          </h4>
          <div className={style.buttom_block}>
            <h4 className={style.news_text}>{dateConvert(news?.createdAt)}</h4>
            <h4 className={style.news_textuser}>Автор: {user?.name}</h4>
            {isEditNews && (
              <div>
                <button>Редактировать</button>
                <button onClick={() => onClickRemoveNews(news?._id)}>
                  удалить
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
