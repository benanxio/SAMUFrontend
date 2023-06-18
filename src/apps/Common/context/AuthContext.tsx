import { RootState } from "@/src/redux/store";
import { createContext } from "react";
import { useSelector } from "react-redux";

export const AuthContext = createContext({} as any);

const AuthProvider = ({ children }: { children: any }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.Login);
  const values = {
    isAuthenticated,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
