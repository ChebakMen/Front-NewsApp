import ReactMarkdown from "react-markdown"
import style from "./style.module.scss"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { useNavigate, useParams } from "react-router-dom"
import {
  useDeleteNewsMutation,
  useGetNewsByIdQuery,
  usePublishNewsMutation,
} from "../../app/sevices/newsApi"

import trashIcon from "../../img/trash.svg"
import checkIcon from "../../img/check.svg"
import editIcon from "../../img/pencil.svg"
import newsImage from "../../img/newsImage.png"

export const FullNewsBlock = () => {
  const params = useParams<{ id: string }>()
  const id = params.id
  if (!id) {
    return
  }

  const { data: news } = useGetNewsByIdQuery({ id })
  const [deleteNews] = useDeleteNewsMutation()
  const [publishNews] = usePublishNewsMutation()

  const user = useSelector((state: RootState) => state.auth.user)
  const navigate = useNavigate()

  const isEditNews = user?._id === news?.author._id
  let isPublished = ""
  if (`${news?.isPublished}` === "true") {
    isPublished = "Опубликована"
  } else {
    isPublished = "Не опубликована"
  }
  let imageUrl = newsImage
  if (news?.imageURL) {
    imageUrl = news?.imageURL
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

  const onClickRemoveNews = async (id: string) => {
    try {
      await deleteNews({ id }).unwrap()
      navigate("/")
    } catch (err) {
      console.error("Ошибка при удалении новости:", err)
    }
  }

  const onClickPublishNews = async (id: string) => {
    try {
      await publishNews({ id }).unwrap()
      navigate("/")
    } catch (err) {
      console.error("Ошибка при публикации новости:", err)
    }
  }

  return (
    <div className={style.news_container}>
      {news?.imageURL ? (
        <img src={`${imageUrl}`} className={style.news_image} />
      ) : (
        <img
          src={`${imageUrl}`}
          className={style.news_image}
          alt={`${imageUrl}`}
        />
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
          {news?.title ? (
            <h2 className={style.news_title}>{news?.title}</h2>
          ) : (
            <h2 className={style.news_title}>
              Новостная статья #1 | Исчезнет, если будут новости
            </h2>
          )}
          {news?.text ? (
            <ReactMarkdown>{news?.text}</ReactMarkdown>
          ) : (
            <h4 className={style.news_text}>
              Привет👋 , это просто тестовая статья, которая показывает как
              могут выглядить другие статьи.
            </h4>
          )}
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
              {news?.createdAt ? (
                <h4 className={style.news_text}>
                  {dateConvert(news?.createdAt)}
                </h4>
              ) : (
                <h4 className={style.news_text}>25 мая 2025г</h4>
              )}
              {news?.author.name ? (
                <h4 className={style.news_textuser}>
                  Автор: {news?.author.name}
                </h4>
              ) : (
                <h4 className={style.news_textuser}>Автор: User229</h4>
              )}
              <h4 className={style.news_text}>Статус: {isPublished}</h4>
            </div>
            {isEditNews && (
              <div className={style.buttons}>
                <button
                  className={`${style.buttonEdit} ${style.button}`}
                  onClick={() => navigate("/createNews")}
                >
                  <img
                    src={editIcon}
                    alt="Редактировать"
                    style={{ width: "25px", height: "25px" }}
                  />
                </button>
                <button
                  className={style.button}
                  onClick={() => onClickRemoveNews(`${news?._id}`)}
                >
                  <img
                    src={trashIcon}
                    alt="Удалить"
                    style={{ width: "25px", height: "25px" }}
                  />
                </button>

                {isPublished == "Не опубликована" && (
                  <button
                    className={`${style.buttonCheck} ${style.button}`}
                    onClick={() => onClickPublishNews(`${news?._id}`)}
                  >
                    <img
                      src={checkIcon}
                      alt="Опубликовать"
                      style={{ width: "25px", height: "25px" }}
                    />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {news?.fileURL && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: 15,
            padding: "8px 10px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            backgroundColor: "#fafafa",
            fontFamily: "Arial, sans-serif",
            margin: "10px 0 0",
          }}
        >
          <div
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              fontWeight: "bold",
              height: "50px",
              borderRadius: 10,
              padding: "6px 3px",
              width: "5px",
              textAlign: "center",
              marginRight: 20,
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
                Файл:
              </h4>
              <a
                href={news.fileURL}
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
                {news.fileURL.split(":")[2]}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
