import useResetPassword from "@/src/apps/Auth/hooks/useResetPassword";
import { ResetPasswordAuth } from "@/src/apps/Auth/models";
import LoaderSpinner from "@/src/apps/Common/components/LoaderSpinner";

import Link from "next/link";
import { useEffect, useState } from "react";
interface Props {
  uid: string;
  token: string;
}
const ResetPassword = ({ uid, token }: Props) => {
  const [resetPasswordForm, setResetPasswordForm] = useState<ResetPasswordAuth>(
    {
      uid: "",
      token: "",
      new_password: "",
      re_new_password: "",
    }
  );
  const { resetPaswordWithemail, isLoadingResetPassword, isUpdatedPassword } = useResetPassword()

  useEffect(() => {
    
    setResetPasswordForm({ ...resetPasswordForm, uid, token: token.toString() })
  }, [uid, token])
  useEffect(() => {
    
  }, []);
  return (
    <div className="flex items-center justify-center h-screen">
      {/* Login Container */}
      <div className="min-w-fit flex-col border bg-white px-6 py-14 shadow-md rounded-[8px] ">
        <div className="mb-8 flex justify-center">
          <img
            className="w-36"
            src="https://res.cloudinary.com/ddksrkond/image/upload/v1685928881/samu/logosamuhd_a8atbw.png"
            alt=""
          />
        </div>
        <div className="flex flex-col text-sm rounded-md">
          <input
            onChange={(e) => setResetPasswordForm({
              ...resetPasswordForm,
              new_password: e.target.value
            })}
            className="border rounded-[5px] p-3 hover:outline-none focus:outline-none hover:border-yellow-500"
            type="password"
            placeholder="Introduce tu nueva contraseña"
          />
          <span className="text-xs" style={{ color: "red" }}></span>


          <input
            onChange={(e) => setResetPasswordForm({
              ...resetPasswordForm,
              re_new_password: e.target.value
            })}
            className="mt-1 border rounded-[5px] p-3 hover:outline-none focus:outline-none hover:border-yellow-500"
            type="password"
            placeholder="Re-introduce tu contraseña"
          />
        </div>
        <span className="text-xs" style={{ color: "red" }}></span>


        <button
          onClick={() => resetPaswordWithemail(resetPasswordForm)}
          className="flex justify-center items-center mt-5 w-full border p-1 bg-gradient-to-r from-red-800 via-red-500 to-red-300 text-white rounded-[4px] hover:bg-red-400 transition-colors duration-300"
          type="submit"
        >
          {!isLoadingResetPassword && <span className="p-1">Actualizar Contraseña</span>}
          {isLoadingResetPassword && <LoaderSpinner/>}

        </button>

        <div className="mt-5 flex justify-between text-sm text-gray-600">

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


export async function getServerSideProps({
  query,
}: {
  query: { uid: string; token: string };
}) {
  const { uid, token } = query;

  return {
    props: { uid, token },
  };
}


export default ResetPassword;
