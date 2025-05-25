import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import {
  useLazyCurrentQuery,
  useRegisterMutation,
} from "../../app/sevices/userApi"
import { useGetAllNewsQuery } from "../../app/sevices/newsApi"

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
  const [trigerCurrentUser] = useLazyCurrentQuery()

  const onSubmit = async (data: Register) => {
    try {
      // console.log(data)
      await register(data).unwrap()
      navigate("/auth")
    } catch (error) {}
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <div className="" style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            maxWidth: "100%",
            width: "340px",
            height: "450px",
            color: "white",
            backgroundColor: "black",
          }}
        >
          <div className="">
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="">
                <label htmlFor="input_email">Email:</label>
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
              <div className="">
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
              <div className="">
                <label htmlFor="input_name">Name:</label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Name required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="input_name"
                      type="text"
                      placeholder="max"
                    />
                  )}
                />
              </div>
              <p>
                Уже есть аккаунт?{" "}
                <Link to="/auth" className="">
                  Зарегистрироваться
                </Link>
              </p>
              <button type="submit">Войти</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
