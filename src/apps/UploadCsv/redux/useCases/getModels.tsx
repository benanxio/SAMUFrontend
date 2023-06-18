import fetchGetModels from "../../services/fetch-get-models";
import { uploadCSVReducer } from "../UploadcsvSlice";

const getModels = async (dispatch: any) => {
  const { networkError, isSuccess, data } = await fetchGetModels();
  if (isSuccess) {
    dispatch(
      uploadCSVReducer({
        listModels: data,
      })
    );
  } else {
    if (networkError) {
      dispatch(
        uploadCSVReducer({
          networkerror: true,
        })
      );
    }
  }
};

export default getModels;
