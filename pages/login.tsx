import useLogin from "@/src/apps/Login/hooks/useLogin";
import { UserAuth } from "@/src/apps/Login/models/login.model";
import {
  Combobox,
  ComboboxProps,
  Option,
  makeStyles,
  shorthands,
  useId,
} from "@fluentui/react-components";
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
  const {
    loginWithEmail,
    isLoading,
    loginErrors,
    clearErrors,
    isAuthenticated,
  } = useLogin();
  
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
          <div className="flex flex-column gap-2">
            <InputText
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
              aria-describedby="email-help"
              placeholder="Email"
            />
            <small id="email-help" style={{ color: "red", maxWidth: "250px" }}>
              {loginErrors?.email}
            </small>
          </div>

          <div className="flex flex-column gap-2 w-full">
            <Password
              placeholder="Password"
              className="w-full"
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
          </div>
          <small id="pass-help" style={{ color: "red", maxWidth: "250px" }}>
            {loginErrors?.detail}
            {loginErrors?.password}
          </small>
        </div>
        <button
          onClick={() => loginWithEmail(loginForm)}
          className="flex justify-center items-center mt-5 w-full border p-1 bg-gradient-to-r from-red-800 via-red-500 to-red-300 text-white rounded-[4px] hover:bg-red-400 transition-colors duration-300"
          type="submit"
        >
          {isLoading && <LoaderSpinner />}
          {!isLoading && <span className="p-1">Iniciar Session</span>}
        </button>

        <div className="mt-5 flex justify-between text-sm text-gray-600">
          <Link href="#" className="underline">
            Olvido su contraseña?
          </Link>
          <Link href="/register" className="underline">
            Registrarse
          </Link>
        </div>
        <div className="flex justify-center mt-5 text-sm"></div>

        <div className="mt-5 flex text-center text-xs text-gray-400">
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

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: "grid",
    gridTemplateRows: "repeat(1fr)",
    justifyItems: "start",
    ...shorthands.gap("2px"),
    maxWidth: "400px",
  },
});

export const Default = (props: Partial<ComboboxProps>) => {
  const comboId = useId("combo-default");
  const options = ["Cat", "Dog", "Ferret", "Fish", "Hamster", "Snake"];
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <label id={comboId}>Best pet</label>
      <Combobox
        aria-labelledby={comboId}
        placeholder="Select an animal"
        {...props}
      >
        {options.map((option) => (
          <Option key={option} disabled={option === "Ferret"}>
            {option}
          </Option>
        ))}
      </Combobox>
    </div>
  );
};
