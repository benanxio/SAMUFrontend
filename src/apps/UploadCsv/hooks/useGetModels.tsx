import { RootState } from "@/src/redux/store";
import axios, { CancelTokenSource } from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getModels from "../redux/useCases/getModels";

const useGetModels = () => {
  const dispatch = useDispatch();
  const source: CancelTokenSource = axios.CancelToken.source();

  const { listModels, isLoading } = useSelector(
    (state: RootState) => state.Upload
  );
  const [loadingModels, setLoadingModels] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoadingModels(true)
      await getModels(dispatch);
      setLoadingModels(false)
    };
    fetch();
  }, []);
  return {
    listModels,
    loadingModels
  };
};

export default useGetModels;
