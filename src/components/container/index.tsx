import React from "react"

type Props = {
  children: React.ReactElement | React.ReactElement[]
}

export const Container: React.FC<Props> = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "10px",
      }}
    >
      {children}
    </div>
  )
}
