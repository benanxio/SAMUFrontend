import { showNoti } from "@/src/apps/Common/redux/NotificationSlice";
import { NameModels } from "../../model";
import fetchDeleteCsvdb from "../../services/fetch-delete-csvdb";
import { uploadCSVReducer } from "../UploadcsvSlice";
import getModels from "./getModels";

const deleteCSV = async (nameModel: NameModels, dispatch: any) => {
  dispatch(
    uploadCSVReducer({
      isLoading: true,
    })
  );

  const { errors, isDeleting, status } = await fetchDeleteCsvdb(nameModel);

  if (isDeleting) {
    dispatch(
      uploadCSVReducer({
        isLoading: false,
      })
    );
    await getModels(dispatch);
    dispatch(
      showNoti({
        type: "info",
        message: "Datos borrados correctamente",
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

export default deleteCSV;
