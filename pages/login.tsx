import useLogin from "@/src/apps/Login/hooks/useLogin";
import { UserAuth } from "@/src/apps/Login/login.model";
import { InputText } from "primereact/inputtext";

import { Password } from "primereact/password";

import LoaderSpinner from "@/src/apps/Common/components/LoaderSpinner";
import { verifyToken } from "@/src/apps/Login/redux/useCases/verify-token";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
const Login = () => {
  const [loginForm, setLoginForm] = useState<UserAuth>({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const { loginWithEmail, isLoading, loginErrors, clearErrors } = useLogin();

  useEffect(() => {
    const f = async () => {
      let isS = await verifyToken(dispatch);
      if (isS) {
        router.push("/");
      }
    };
    f();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="min-w-fit flex-col border bg-white px-6 py-14 shadow-md rounded-[8px] ">
        <div className="mb-5 flex justify-center">
          <img
            className="w-36"
            src="https://www.onsv.gob.pe/img/logosamu.jpg"
            alt=""
          />
        </div>
        <div className="flex flex-col text-sm rounded-md">
          <div className="mb-2">
            <InputText
              className="w-full"
              onChange={(e) => {
                clearErrors();
                setLoginForm({
                  ...loginForm,
                  email: e.target.value,
                });
              }}
              id="email"
              value={loginForm.email}
              type="email"
              placeholder="Email"
            />
          </div>
          <small id="email-help" style={{ color: "red" }}>
            {loginErrors?.email}
          </small>

          <Password
            placeholder="Password"
            value={loginForm.password}
            onChange={(e) => {
              clearErrors();
              setLoginForm({
                ...loginForm,
                password: e.target.value,
              });
            }}
            toggleMask
            feedback={false}
          />

          <small id="pass-help" style={{ color: "red", maxWidth: "240px" }}>
            {loginErrors?.detail}
            {loginErrors?.password}
          </small>
        </div>
        <button
          onClick={() => loginWithEmail(loginForm)}
          
          className="flex justify-center items-center mt-3 w-full border p-1 bg-gradient-to-r from-red-800 via-red-500 to-red-300 text-white rounded-[4px] hover:bg-red-400 transition-colors duration-300"
          type="submit"
        >
          {isLoading && <LoaderSpinner />}
          {!isLoading && <span className="p-1">Iniciar Session</span>}
        </button>

        <div className="mt-2 flex justify-between text-sm text-gray-600">
          <Link href="/forgot-password" className="underline">
            Olvido su contraseña?
          </Link>
          <Link href="/register" className="underline">
            Registrarse
          </Link>
        </div>

        <div className="mt-3 flex text-center text-xs text-gray-400">
          <p>
            Esta cuenta necesitara ser habiltada para poder <br />
            iniciar session contacta con el
            <br />
            <Link className="underline" href="">
              {" "}
              Administrador
            </Link>{" "}
            para habilitar su cuenta <br />
            si tienes dudas ve a
            <Link className="underline" href="">
              {" "}
              manual de registro.
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
