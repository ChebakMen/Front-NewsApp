import { useEffect } from "react"
import { Header } from "../header"
import { Container } from "../container"
import { NavBar } from "../nav-bar"
import { Outlet, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setToken, setUser } from "../../features/user/authSlice"
import { useCurrentQuery } from "../../app/sevices/userApi"
import style from "./style.module.scss"

export const Layout = () => {
  const token = localStorage.getItem("token")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { data: user } = useCurrentQuery()

  useEffect(() => {
    if (user) {
      dispatch(setUser(user))
    }
  }, [user, dispatch])

  useEffect(() => {
    if (token) {
      dispatch(setToken(token))
    } else {
      navigate("/auth")
    }
  }, [token, dispatch, navigate])

  return (
    <>
      <Header />
      <Container>
        <div className={style.nav_block}>
          <NavBar />
        </div>
        <div className={style.outlet_block}>
          <Outlet />
        </div>
      </Container>
    </>
  )
}
