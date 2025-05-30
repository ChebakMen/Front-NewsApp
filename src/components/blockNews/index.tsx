import { useEffect } from "react"
import {
  useGetAllNewsQuery,
  useGetAllPublishedQuery,
} from "../../app/sevices/newsApi"
import { useDispatch, useSelector } from "react-redux"
import { setNews } from "../../features/news/newsSlice"
import { RootState } from "../../app/store"
import { NewsCard } from "../../components/newsCard"

type Props = {
  isPublishedNews: boolean
}

export const BlockNews = ({ isPublishedNews }: Props) => {
  const dispatch = useDispatch()
  const news = useSelector((state: RootState) => state.news.news)

  const ifNewsSucsess = news.status === "success"
  const publishedQuery = useGetAllPublishedQuery()
  const allNewsQuery = useGetAllNewsQuery()

  const data = isPublishedNews ? publishedQuery.data : allNewsQuery.data

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
        <div className="">
          {news && news.items && news.items.length > 0 ? (
            ifNewsSucsess &&
            news.items.map((obj, index) => (
              <NewsCard
                key={index}
                _id={obj._id}
                createdAt={dateConvert(obj.createdAt)}
                authorName={obj.author ? obj.author.name : "Автор не указан"}
                imageURL={obj.imageURL ?? ""}
                title={obj.title}
                text={obj.text}
              />
            ))
          ) : (
            <NewsCard
              _id={1}
              authorName="Чебыкин Максим Анатольевич"
              title="Новостная статья #1 | Исчезнет, если будут новости"
              text="Привет👋 , это просто тестовая статья, которая показывает как могут выглядить другие статьи."
              createdAt={"12 июня 2022 г."}
              imageURL=""
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
