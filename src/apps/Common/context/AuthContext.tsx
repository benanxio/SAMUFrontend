import { RootState } from "@/src/redux/store";
import { createContext, useEffect } from "react";
import { useSelector } from "react-redux";
import useUser from "../../Reports/hooks/useUser";

export const AuthContext = createContext({} as any);

const AuthProvider = ({ children }: { children: any }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.Login);
  const { loadUser } = useUser();
  useEffect(() => {
    loadUser();
  }, []);
  const values = {
    isAuthenticated,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
