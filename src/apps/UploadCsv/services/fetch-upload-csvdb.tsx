import { siteURL } from "@/src/lib/envs";
import axios, { AxiosResponse, CancelTokenSource } from "axios";
import { NameModels } from "../model";

interface PostResponse {
  errors: any;
  data: any;
  status: number;
  isSucess: boolean;
}

const fetchUploadCSV = async (
  file: File,
  nameModel: NameModels,
  encode: string,
  delimiter: string
): Promise<PostResponse> => {
  const source: CancelTokenSource = axios.CancelToken.source();
  try {
    const formData = new FormData();
    formData.append("csv_file", file);
    formData.append("delimiter", delimiter);
    formData.append("encode", encode);
    const response: AxiosResponse = await axios.post(
      `${siteURL}/api/upload-csv-${nameModel}`,
      formData,
      {
        cancelToken: source.token,
      }
    );
    return {
      errors: {},
      data: response.data,
      status: response.status,
      isSucess: true,
    };
  } catch (e: any) {
    console.log(e);
    if (e.code === "ERR_NETWORK") {
      return {
        errors: {
          error_type: "Error de red",
          message: "Servidor no disponible por ahora.",
        },
        data: [],
        status: e.response?.status,
        isSucess: false,
      };
    }
    return {
      errors: e.response?.data,
      data: [],
      status: e.response?.status,
      isSucess: false,
    };
  } finally {
    source.cancel();
  }
};

export default fetchUploadCSV;
