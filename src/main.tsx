import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Layout } from "./components/layout"
import { PublishedNews } from "./pages/published-news"
import { Auth } from "./pages/auth"
import { Login } from "./features/user/login"
import { Register } from "./features/user/register"
import { FullNewsBlock } from "./components/fullNewsBlock"

const container = document.getElementById("root")

const router = createBrowserRouter([
  {
    path: "/auth/",
    element: <Auth />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "reg",
        element: <Register />,
      },
    ],
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <PublishedNews />,
      },
      {
        path: "allNews",
        element: <div className="">allNews</div>,
      },
      {
        path: "news/:id",
        element: <FullNewsBlock />,
      },
    ],
  },
])

if (container) {
  const root = createRoot(container)

  root.render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
