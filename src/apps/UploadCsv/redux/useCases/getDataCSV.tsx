import { NameModels } from "../../model";
import fetchGetModelData from "../../services/fetch-get-model-data";
import { uploadCSVReducer } from "../UploadcsvSlice";

const getDataCSV = async (nameModel: NameModels, dispatch: any) => {
  dispatch(
    uploadCSVReducer({
      isLoading: true,
    })
  );

  const { isSuccess, data, errors } = await fetchGetModelData(nameModel);

  if (isSuccess) {
    dispatch(
      uploadCSVReducer({
        isLoading: false,
        dataCSV: data?.results,
      })
    );
  } else {
    dispatch(
      uploadCSVReducer({
        isLoading: false,
        errors,
      })
    );
  }
};

export default getDataCSV;
