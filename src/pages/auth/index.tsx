import React from "react"
import { Outlet } from "react-router-dom"

export const Auth: React.FC = () => {
  return (
    <div className="">
      <Outlet />
    </div>
  )
}
