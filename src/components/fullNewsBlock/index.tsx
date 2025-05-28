import trashIcon from "../../img/trash.svg"
import checkIcon from "../../img/check.svg"
import editIcon from "../../img/pencil.svg"
import newsImage from "../../img/newsImage.png"
import ReactMarkdown from "react-markdown"
import style from "./style.module.scss"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import {
  useDeleteNewsMutation,
  useGetNewsByIdQuery,
  usePublishNewsMutation,
} from "../../app/sevices/newsApi"
import { useNavigate, useParams } from "react-router-dom"

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
    console.log(news?.imageURL)
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
      {imageUrl && (
        <img
          src={`${import.meta.env.VITE_API_URL}${imageUrl}`}
          className={style.news_image}
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
          <h2 className={style.news_title}>{news?.title}</h2>
          <ReactMarkdown>{news?.text}</ReactMarkdown>
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
                {dateConvert(news?.createdAt)}
              </h4>
              <h4 className={style.news_textuser}>
                Автор: {news?.author.name}
              </h4>
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
    </div>
  )
}
