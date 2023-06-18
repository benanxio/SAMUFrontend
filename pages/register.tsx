import LoaderSpinner from "@/src/apps/Common/components/LoaderSpinner";
import useLogin from "@/src/apps/Login/hooks/useLogin";
import { verifyToken } from "@/src/apps/Login/redux/useCases/verify-token";
import useRegister from "@/src/apps/Register/hooks/useRegister";
import { UserAuthRegister } from "@/src/apps/Register/models/register.models";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [registerForm, setRegisterForm] = useState<UserAuthRegister>({
    email: "",
    nickname: "",
    password: "",
    re_password: "",
  });
  const { signNupWithEmail, errors, signupLoading, isSendEmail } =
    useRegister();
  const { isAuthenticated } = useLogin();

  useEffect(() => {
    const f = async () => {
      await verifyToken(dispatch);
    };
    f();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      {/* Login Container */}
      <div className="min-w-fit flex-col border bg-white px-6 py-14 shadow-md rounded-[8px] ">
        <div className="mb-5 flex justify-center">
          <img
            className="w-36"
            src="https://www.onsv.gob.pe/img/logosamu.jpg"
            alt=""
          />
        </div>
        <div className="flex flex-col text-sm rounded-md">
          <div className="flex flex-col text-sm rounded-md">
            <input
              onChange={(e) => {
                setRegisterForm({
                  ...registerForm,
                  nickname: e.target.value,
                });
              }}
              className="mb-1 rounded-[5px] border p-3 hover:outline-none focus:outline-none hover:border-yellow-500 "
              type="text"
              placeholder="Nombre de usuario"
            />
            <span className="text-xs" style={{ color: "red" }}>
              {errors?.nickname}
            </span>
            <input
              onChange={(e) => {
                setRegisterForm({
                  ...registerForm,
                  email: e.target.value,
                });
              }}
              className="mb-1  rounded-[5px] border p-3 hover:outline-none focus:outline-none hover:border-yellow-500 "
              type="email"
              placeholder="Correo Electronico"
            />
            <span className="text-xs" style={{ color: "red" }}>
              {errors?.email}
            </span>{" "}
            <input
              onChange={(e) => {
                setRegisterForm({
                  ...registerForm,
                  password: e.target.value,
                });
              }}
              className="mb-1 border rounded-[5px] p-3 hover:outline-none focus:outline-none hover:border-yellow-500"
              type="password"
              placeholder="Ingrese su contraseña"
            />
            <span className="text-xs" style={{ color: "red" }}>
              {errors?.password}
            </span>
            <input
              onChange={(e) => {
                setRegisterForm({
                  ...registerForm,
                  re_password: e.target.value,
                });
              }}
              className="mb-5 border rounded-[5px] p-3 hover:outline-none focus:outline-none hover:border-yellow-500"
              type="password"
              placeholder="Re-ingrese su contraseña"
            />
            <span
              className="text-xs"
              style={{ color: "red", maxWidth: "250px" }}
            >
              {errors?.re_password}
              {errors?.detail}
              {errors?.non_field_errors}
            </span>
            {isSendEmail && (
              <span
                className="text-xs"
                style={{ color: "green", maxWidth: "250px" }}
              >
                {" "}
                Te hemos enviado un correo.
                <Link
                  href="https://gmail.com/"
                  target="_blank"
                  className="underline"
                >
                  Revisalo.
                </Link>
              </span>
            )}
          </div>
        </div>
        <button
          className="flex justify-center items-center  mt-5 w-full border p-2 bg-gradient-to-r from-red-800 via-red-500 to-red-300 text-white rounded-[4px] hover:bg-red-400 transition-colors duration-300"
          type="submit"
          onClick={() => {
            signNupWithEmail(registerForm);
          }}
        >
          {signupLoading && <LoaderSpinner />}
          {!signupLoading && <span className="p-1">Registrarse</span>}
        </button>

        <div className=" mt-5 flex justify-between text-sm text-gray-600">
          <Link href="/login" className="underline">
            Ya tienes una cuenta activada?
          </Link>
        </div>
        <div className="flex justify-center mt-5 text-sm"></div>

        <div className="mt-5 flex text-center text-xs text-gray-400">
          <p>
            Esta cuenta necesitara ser activada con un correo <br /> electronico
            y contacta con el
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

export default Register;
