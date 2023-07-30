import "./App.css";
import SignUp from "./page/signUpPages/SignUp";
import HomePage from "./page/homePage/HomePage";
import BlogPost from "./page/BlogPost/BlogPost";
import LoginPage from "./page/LoginPage/LoginPage";
import AddPost from "./page/AddPost/AddPost"
import Navbar from "./components/sidebar/Navbar";
import Profile from "./page/profile/Profile";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from "react-router-dom";

function App() {
  const Layout = () => {
    return(
      <div className="blog-layout ">
        <div className="nav-cont"><Navbar/></div>
        <div className="outlet"><Outlet/></div>
      </div>
    )
  }
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Layout/>,
      children:[
        {
          path: "/",
          element: <HomePage/>,
        },
    
        {
          path: "/newpost",
          element: <AddPost/>
        },
    
       
        {
          path: "blog/:id",
          element: <BlogPost/>,
        },

        {
          path: "/profile",
          element: <Profile/>,
        },
      ]
    },
    {
      path: "signup",
      element: <SignUp />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
