import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./Components/index";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentuser()
      .then((data) => (data ? dispatch(login({ data })) : dispatch(logout())))
      .finally(() => setLoading(false));
  }, []);
  return !loading ? (
    <>
      <div className="min-h-screen flex">
        <div className="w-full block">
          <Header />
          <main>{Outlet}</main>
          <Footer />
        </div>
      </div>
    </>
  ) : null;
}

export default App;
