import { createContext } from "react";
import useGetModels from "../apps/UploadCsv/hooks/useGetModels";
import { ListModels } from "../apps/UploadCsv/model";

interface ValuesDataContext {
  listModels?: ListModels[];
  loadingModels?: boolean;
}

export const DataContext = createContext({} as ValuesDataContext);
const DataProvider = ({ children }: any) => {
  const { listModels, loadingModels } = useGetModels();

  const values = {
    listModels,
    loadingModels,
  };
  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
};

export default DataProvider;
