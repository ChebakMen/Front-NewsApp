import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { useLoginMutation } from "../../app/sevices/userApi"

import style from "./style.module.scss"

type Login = {
  email: string
  password: string
}

export const Login = () => {
  const { handleSubmit, control } = useForm<Login>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const [login, { isLoading }] = useLoginMutation()
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const onSubmit = async (data: Login) => {
    try {
      const token = await login(data).unwrap()

      // console.log(token)
      if (token) {
        localStorage.setItem("token", token.token)
        navigate("/")
      }
    } catch (error: any) {
      let errorMessage = ""
      if (error?.data?.error) {
        errorMessage = error.data.error
      } else if (error?.error) {
        errorMessage = error.error
      } else if (typeof error === "string") {
        errorMessage = error
      }

      setError(errorMessage)
    }
  }

  return (
    <div
      className={style.container}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <div className="" style={{ display: "flex", flexDirection: "column" }}>
        <div className={style.wrapper}>
          <div>
            <h1>Войти</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={style.div_input}>
                <label htmlFor="input_email" className={style.label}>
                  Email:
                </label>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: "Email required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="input_email"
                      type="email"
                      className={style.input}
                      placeholder="maksim@gmail.com"
                    />
                  )}
                />
              </div>
              <div className={style.div_input}>
                <label htmlFor="input_password" className={style.label}>
                  Пароль:
                </label>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Password required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="input_password"
                      type="password"
                      className={style.input}
                      placeholder="1111"
                    />
                  )}
                />
              </div>

              <p className={style.p}>
                Нет аккаунта?{" "}
                <Link to="/auth/reg" className="">
                  Зарегистрируйтесь
                </Link>
              </p>
              <p className={style.error}>{error}</p>
              <button
                type="submit"
                className={style.button}
                disabled={isLoading}
              >
                Войти
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
