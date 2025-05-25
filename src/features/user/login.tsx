import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { useLoginMutation } from "../../app/sevices/userApi"

import {} from "./login.scss"

type Login = {
  email: string
  password: string
}

export const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Login>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()

  const onSubmit = async (data: Login) => {
    try {
      const token = await login(data).unwrap()

      // console.log(token)
      if (token) {
        localStorage.setItem("token", token.token)
        navigate("/")
      }
    } catch (error) {}
  }

  return (
    <div
      className="container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <div className="" style={{ display: "flex", flexDirection: "column" }}>
        <div className="wrapper">
          <div>
            <h1>Войти</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="div_input">
                <label htmlFor="input_email" className="input_label">
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
                      placeholder="maksim@gmail.com"
                    />
                  )}
                />
              </div>
              <div className="div_input">
                <label htmlFor="input_password">Password:</label>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Password required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="input_password"
                      type="password"
                      placeholder="1111"
                    />
                  )}
                />
              </div>

              <p>
                Нет аккаунта?{" "}
                <Link to="/auth/reg" className="">
                  Зарегистрируйтесь
                </Link>
              </p>
              <button type="submit" disabled={isLoading}>
                Войти
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
