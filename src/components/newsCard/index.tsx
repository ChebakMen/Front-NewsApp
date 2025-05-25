import React from "react"

import style from "./style.module.scss"

type Props = {
  _id: number | string
  title: string
  text: string
  userName: string | undefined
  createdAt: string
  imageUrl?: string | undefined
}

export const NewsCard: React.FC<Props> = ({
  _id,
  title,
  userName,
  createdAt,
  text,
  imageUrl,
}) => {
  return (
    <div className={style.news_container}>
      {imageUrl && (
        <img src={imageUrl} className={style.news_image} alt={title} />
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
          <h2 className={style.news_title}>
            <a href={`/news/${_id}`}>{title}</a>
          </h2>
          <h4 className={style.news_text}>{text}</h4>
          <div className={style.buttom_block}>
            <h4 className={style.news_text}>{createdAt}</h4>
            <h4 className={style.news_textuser}>Автор: {userName}</h4>
          </div>
        </div>
      </div>
    </div>
  )
}
