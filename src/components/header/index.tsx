import React from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { setToken } from "../../features/user/authSlice"
import style from "./style.module.scss"

export const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(setToken(""))
    localStorage.removeItem("token")
    navigate("/auth")
  }

  return (
    <div
      className={style.container}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <div className={style.wrapper}>
        <Link to={"/"} className={style.logo}>
          Тестовое задание
        </Link>
        <div className="" style={{ marginLeft: "40px" }}>
          <button onClick={handleLogout} className={style.button}>
            Выйти
          </button>
        </div>
      </div>
    </div>
  )
}
