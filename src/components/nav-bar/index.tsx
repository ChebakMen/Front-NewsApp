import React from "react"
import { Link } from "react-router-dom"
import style from "./style.module.scss"

export const NavBar = () => {
  return (
    <nav>
      <h4 className={style.h4}>Разделы</h4>
      <ul className={style.ul}>
        <Link to="/" className={style.button_link}>
          Опубликованные статьи
        </Link>
        <Link to="allNews" className={style.button_link}>
          Все новости
        </Link>
        <Link to="createNews" className={style.button_link}>
          Создать статью
        </Link>
      </ul>
    </nav>
  )
}
