import { createContext } from "react";
import useGetModels from "../apps/UploadCsv/hooks/useGetModels";
import { ListModels } from "../apps/UploadCsv/uploadcsv.model";

interface ValuesDataContext {
  listModels?: ListModels[];
  isLoadingModals?: boolean;
}

export const DataContext = createContext({} as ValuesDataContext);

const DataProvider = ({ children }: any) => {
  const { listModels, isLoadingModals } = useGetModels();

  const values = {
    listModels,
    isLoadingModals,
  };
  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
};

export default DataProvider;
