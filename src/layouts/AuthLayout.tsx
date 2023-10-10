import { Suspense, FC } from "react";
import { Outlet } from "react-router";

import Footer from "../components/Footer/Footer";
import SecondHeader from "../components/SecondHeader/SecondHeader";
import Preloader from "../components/FallBackPreloader/FallBackPreloader";

const AuthLayout: FC = () => {
  return (
    <>
      <SecondHeader />
      <Suspense fallback={<Preloader />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
};

export default AuthLayout;
