import { showNoti } from "@/src/apps/Common/redux/NotificationSlice";
import { NameModels } from "../../model";
import fetchUploadCSV from "../../services/fetch-upload-csvdb";
import { uploadCSVReducer } from "../UploadcsvSlice";
import getModels from "./getModels";

const uploadCSV = async (
  fileCSV: File,
  nameModel: NameModels,
  delimiter: string,
  encode: string,
  dispatch: any
) => {
  dispatch(
    uploadCSVReducer({
      isLoading: true,
    })
  );

  const { errors, data, status, isSucess } = await fetchUploadCSV(
    fileCSV,
    nameModel,
    encode,
    delimiter
  );
  console.log(data);
  if (isSucess) {
    dispatch(
      uploadCSVReducer({
        isLoading: false,
        infoSuccess: data,
        errors: null,
      })
    );
    await getModels(dispatch);
    dispatch(
      showNoti({
        message: "Cargado con exito",
        type: "success",
      })
    );
  } else {
    dispatch(
      uploadCSVReducer({
        isLoading: false,
        errors,
        infoSuccess: null,
      })
    );
    dispatch(
      showNoti({
        message: `Hubo un error.Revisa los detalles.`,
        type: "error",
      })
    );
  }
};

export default uploadCSV;
