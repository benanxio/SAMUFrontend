import { siteURL } from "@/src/lib/envs";
import axios, { CancelTokenSource } from "axios";
interface GetResponse {
  errors?: any;
  isSuccess?: boolean;
  data?: any;
  networkError?: boolean;
}
const fetchGetModels = async (): Promise<GetResponse> => {
  const source: CancelTokenSource = axios.CancelToken.source();

  try {
    const response: any = await axios.get(`${siteURL}/api/verify-data-models`, {
      cancelToken: source.token,
    });
    return {
      errors: {},
      isSuccess: true,
      data: response.data,
    };
  } catch (e: any) {
      console.log(e)
    if (e.code === "ERR_NETWORK") {
      return {
        isSuccess: false,
        networkError: true,
      };
    }
    return {
      errors: e.response?.data,
      isSuccess: true,
      networkError: false,
    };
  }
};

export default fetchGetModels;
