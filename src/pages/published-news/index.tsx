import React, { useEffect, useState } from "react"
import {
  useGetAllNewsQuery,
  useGetAllPublishedQuery,
} from "../../app/sevices/newsApi"
import { CreateNews } from "../../components/create-news"
import { useDispatch, useSelector } from "react-redux"
import { setNews } from "../../features/news/newsSlice"
import { RootState } from "../../app/store"
import { NewsCard } from "../../components/newsCard"
import { useCurrentQuery } from "../../app/sevices/userApi"

export const PublishedNews = () => {
  const dispatch = useDispatch()
  const news = useSelector((state: RootState) => state.news.news)
  const user = useSelector((state: RootState) => state.auth.user)
  const ifNewsSucsess = news.status === "success"

  // const { data } = useGetAllPublishedQuery()
  const { data } = useGetAllNewsQuery()

  const dateConvert = (date: Date) => {
    const dateObj = typeof date === "string" ? new Date(date) : date
    return dateObj.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  useEffect(() => {
    if (data) {
      dispatch(setNews(data))
    }
  }, [data, dispatch])

  return (
    <>
      <div className="">
        <CreateNews />

        <div className="">
          {news && news.items && news.items.length > 0 ? (
            ifNewsSucsess &&
            news.items.map((obj, index) => (
              <>
                <NewsCard
                  key={index}
                  _id={obj._id}
                  createdAt={dateConvert(obj.createdAt)}
                  userName={user?.name}
                  imageUrl={obj.imageURL ?? ""}
                  title={obj.title}
                  text={obj.text}
                />
              </>
            ))
          ) : (
            <NewsCard
              _id={1}
              userName="Чебыкин Максим Анатольевич"
              title="Roast the code #1 | Rock Paper Scissors"
              text="Hey there! 👋 I'm starting a new series called Roast the Code, where
          I will share some code, and let YOU roast and improve it. There's not
          much more to it, just be polite and constructive, this is an exercise
          so we can all learn together. Now then, head over to the repo and
          roast as hard as you can"
              imageUrl="https://resizer.mail.ru/p/c2631098-aaf3-5a49-934d-dcb15e29355a/AQAKvaSf6g3q55IuLjoTtCsahNWTGl2LTQoonhDwyj7Ynv3-veKTaMiP3yKtrl0WawOk5fP59EXlUXXOoKi-ltIzGTQ.jpg"
              createdAt={"12 июня 2022 г."}
            />
          )}
        </div>
      </div>
    </>
  )
}

{
  /* <Link to="fullNews" className="button-link">
                      Подробнее
                    </Link> */
}
