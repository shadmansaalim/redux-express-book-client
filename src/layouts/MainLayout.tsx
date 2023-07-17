import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

export default function MainLayout() {
  return (
    <div>
      <Header />
      <div className="pt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
