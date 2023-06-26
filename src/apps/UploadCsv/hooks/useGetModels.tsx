import { RootState } from "@/src/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getModels from "../redux/useCases/getModels";

const useGetModels = () => {
  const dispatch = useDispatch();
  const { listModels, isLoadingModals } = useSelector(
    (state: RootState) => state.Upload
  );

  useEffect(() => {
    const fetch = async () => {
      await getModels(dispatch);
    };
    fetch();
  }, []);
  return {
    isLoadingModals,
    listModels
  };
};

export default useGetModels;
