import LoaderSpinner from "@/src/apps/Common/components/LoaderSpinner";
import { verifyToken } from "@/src/apps/Login/redux/useCases/verify-token";
import useRegister from "@/src/apps/Register/hooks/useRegister";
import { UserAuthRegister } from "@/src/apps/Register/register.models";
import Link from "next/link";
import { useRouter } from "next/router";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Register = () => {
  const [registerForm, setRegisterForm] = useState<UserAuthRegister>({
    email: "",
    nickname: "",
    password: "",
    re_password: "",
    last_name: "",
    first_name: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const { signNupWithEmail, errors, signupLoading, isSendEmail, clearErrors } =
    useRegister();

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
          <div className="flex flex-col text-sm rounded-md">
            <InputText
              onChange={(e) => {
                setRegisterForm({
                  ...registerForm,
                  first_name: e.target.value,
                });
              }}
              id="names"
              value={registerForm.first_name}
              type="text"
              aria-describedby="usename-help"
              placeholder="Introduce tus nombres"
              className="mt-2 w-full"
            />
            <InputText
              onChange={(e) => {
                setRegisterForm({
                  ...registerForm,
                  last_name: e.target.value,
                });
              }}
              id="last_names"
              value={registerForm.last_name}
              type="text"
              aria-describedby="usename-help"
              placeholder="Introduce tus apellidos"
              className="mt-2 w-full"
            />
            <InputText
              onChange={(e) => {
                setRegisterForm({
                  ...registerForm,
                  nickname: e.target.value,
                });
              }}
              id="username"
              value={registerForm.nickname}
              type="text"
              aria-describedby="usename-help"
              placeholder="Nombre de usuario"
              className="mt-2 w-full"
            />
            <span
              className="text-xs"
              style={{ color: "red", maxWidth: "250px" }}
            >
              {errors?.nickname}
            </span>
            <InputText
              className="mt-2 w-full"
              onChange={(e) => {
                setRegisterForm({
                  ...registerForm,
                  email: e.target.value,
                });
              }}
              id="email"
              value={registerForm.email}
              type="email"
              aria-describedby="email-help"
              placeholder="Correo electronico"
            />
            <span
              className="text-xs "
              style={{ color: "red", maxWidth: "250px" }}
            >
              {errors?.email}
            </span>{" "}
            <Password
              placeholder="Ingrese su contraseña"
              value={registerForm.password}
              onChange={(e) => {
                setRegisterForm({
                  ...registerForm,
                  password: e.target.value,
                });
              }}
              toggleMask
              feedback={false}
              className="mt-2 w-full"
            />
            <span
              className="text-xs"
              style={{ color: "red", maxWidth: "250px" }}
            >
              {errors?.password}
            </span>
            <Password
              placeholder="Re-ingrese su contraseña"
              value={registerForm.re_password}
              onChange={(e) => {
                setRegisterForm({
                  ...registerForm,
                  re_password: e.target.value,
                });
              }}
              toggleMask
              feedback={false}
              className="mt-2 w-full"
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
          className="flex justify-center items-center  mt-3 w-full border p-2 bg-gradient-to-r from-red-800 via-red-500 to-red-300 text-white rounded-[4px] hover:bg-red-400 transition-colors duration-300"
          type="submit"
          onClick={() => {
            clearErrors();
            signNupWithEmail(registerForm);
          }}
        >
          {signupLoading && <LoaderSpinner />}
          {!signupLoading && <span className="p-1">Registrarse</span>}
        </button>

        <div className=" mt-2 flex justify-between text-sm text-gray-600">
          <Link href="/login" className="underline">
            Ya tienes una cuenta activada?
          </Link>
        </div>

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
