import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { useRegisterMutation } from "../../app/sevices/userApi"
import style from "./style.module.scss"
type Register = {
  email: string
  password: string
  name: string
}

export const Register = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Register>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })

  const [register, { isLoading }] = useRegisterMutation()

  const navigate = useNavigate()
  const [error, setError] = useState("")

  const onSubmit = async (data: Register) => {
    try {
      // console.log(data)
      await register(data).unwrap()
      navigate("/auth")
    } catch (error: any) {
      console.log(error)
      let errorMessage = ""
      if (error?.data?.error) {
        errorMessage = error.data.error
      }

      setError(errorMessage)
    }
  }

  return (
    <div className={style.container}>
      <div className="" style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <div className={style.wrapper}>
            <h1>Регистрация</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={style.div_input}>
                <label htmlFor="input_name" className={style.label}>
                  Имя:
                </label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Name required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="input_name"
                      type="text"
                      className={style.input}
                      placeholder="max"
                    />
                  )}
                />
              </div>
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
                Уже есть аккаунт?{" "}
                <Link to="/auth" className="">
                  Войти
                </Link>
              </p>
              <p className={style.error}>{error}</p>
              <button
                type="submit"
                className={style.button}
                disabled={isLoading}
              >
                Зарегистрироваться
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
