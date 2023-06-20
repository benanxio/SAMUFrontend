import Link from "next/link";
import { useRouter } from "next/router";
import { Ripple } from "primereact/ripple";
import { StyleClass } from "primereact/styleclass";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import useLogin from "../Login/hooks/useLogin";
import { verifyToken } from "../Login/redux/useCases/verify-token";
import LoadingScreen from "./LoadingScreen";
const Layout = ({ children }: any) => {
  const dispatch = useDispatch();
  const btnRef10 = useRef(null);
  const btnRef11 = useRef(null);
  const btnRef12 = useRef(null);
  const [loading, setLoading] = useState(true);

  const { logOutApp, isAuthenticated } = useLogin();
  const router = useRouter();

  useEffect(() => {
    const fetch = async () => {
      let isS = await verifyToken(dispatch);
      setLoading(false);
      if (!isS) {
        router.push("/login");
      }
    };

    fetch();
  }, []);

  if (loading) return <LoadingScreen />;
  return (
    <div>
      <div>
        {isAuthenticated && (
          <div
            className={`min-h-screen flex relative  lg:static surface-ground`}
          >
            <div
              id="app-sidebar-9"
              className="h-full  lg:h-auto surface-section hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border w-18rem lg:w-7rem select-none"
            >
              <div className="flex flex-column h-full">
                <div className="flex align-items-center justify-content-center flex-shrink-0">
                  <img
                    src="https://res.cloudinary.com/ddksrkond/image/upload/v1686753544/samu/logosamuhd_a8atbw.png"
                    alt="Image"
                    style={{ width: "40px", height: "40px", margin: "5px" }}
                  />
                </div>
                <b className="text-center text-red-500">SAMU</b>
                <div className="mt-3">
                  <ul className="list-none p-0 m-0">
                    <li>
                      <Link href="/" className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center text-cyan-600 border-left-2 border-cyan-600 hover:border-300 transition-duration-150 transition-colors">
                        <i className="pi pi-home mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-2xl"></i>
                        <span className="font-medium inline text-base lg:text-xs lg:block">
                          Home
                        </span>
                        <Ripple />
                      </Link>
                    </li>
                    <li>
                      <a className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center text-600 border-left-2 border-transparent hover:border-300 transition-duration-150 transition-colors">
                        <i className="pi pi-search mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-2xl"></i>
                        <span className="font-medium inline text-base lg:text-xs lg:block">
                          Search
                        </span>
                        <Ripple />
                      </a>
                    </li>
                    <li>
                      <Link
                        href="/upload"
                        className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center text-600 border-left-2 border-transparent hover:border-300 transition-duration-150 transition-colors"
                      >
                        <i className="pi pi-users mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-2xl"></i>
                        <span className="font-medium inline text-base lg:text-xs lg:block">
                          Upload
                        </span>
                        <Ripple />
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/reports"
                        className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center text-600 border-left-2 border-transparent hover:border-300 transition-duration-150 transition-colors"
                      >
                        <i className="pi pi-chart-bar mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-2xl"></i>
                        <span className="font-medium inline text-base lg:text-xs lg:block">
                          Reportes
                        </span>
                        <Ripple />
                      </Link>
                    </li>
                    <li>
                      <a className="p-ripple flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center text-600 border-left-2 border-transparent hover:border-300 transition-duration-150 transition-colors">
                        <i className="pi pi-cog mr-2 lg:mr-0 mb-0 lg:mb-2 text-base lg:text-2xl"></i>
                        <span className="font-medium inline text-base lg:text-xs lg:block">
                          Options
                        </span>
                        <Ripple />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mt-auto">
                  <hr className="mb-3 mx-3 border-top-1 border-none surface-border" />
                  <a
                    onClick={() => logOutApp()}
                    className="p-ripple m-3 flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center hover:surface-200 border-round text-600 transition-duration-150 transition-colors"
                  >
                    <i className="pi pi-sign-out"></i>
                    <Ripple />
                  </a>
                </div>
              </div>
            </div>
            <div className="min-h-screen flex flex-column relative flex-auto">
              <div
                className="flex justify-content-between align-items-center px-5 surface-section relative lg:static border-bottom-1 surface-border"
                style={{ height: "60px" }}
              >
                <div className="flex">
                  <StyleClass
                    nodeRef={btnRef12}
                    selector="#app-sidebar-9"
                    enterClassName="hidden"
                    enterActiveClassName="fadeinleft"
                    leaveToClassName="hidden"
                    leaveActiveClassName="fadeoutleft"
                    hideOnOutsideClick
                  >
                    <a
                      ref={btnRef12}
                      className="p-ripple cursor-pointer block lg:hidden text-700 mr-3"
                    >
                      <i className="pi pi-bars text-4xl"></i>
                      <Ripple />
                    </a>
                  </StyleClass>
                </div>
              </div>
              <div className="p-5 flex flex-column flex-auto">{children}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
