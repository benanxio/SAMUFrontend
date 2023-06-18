import { createContext, useState } from "react";

interface Indetifier {
  key?: string;
  isOpen?: boolean;
}

export const UIContext = createContext({} as any);
const UIProvider = ({ children }: any) => {
  const [visibleWithoutModal, setVisibleWithoutModal] = useState<Indetifier>({
    key: "",
  });

  const values = {
    setVisibleWithoutModal,
    visibleWithoutModal,
  };
  return <UIContext.Provider value={values}>{children}</UIContext.Provider>;
};

export default UIProvider;
