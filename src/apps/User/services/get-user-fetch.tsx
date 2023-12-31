import { siteURL } from "@/src/lib/envs";
import {
    ServiceFetchResponse,
    responseServiceState,
    returnNetworkError,
} from "@/src/lib/error-https-services";
import axios, { AxiosResponse, CancelTokenSource } from "axios";
import { getTokensFromLocalStorage } from "../../Login/services/token-service";

const getUserFetch = async (): Promise<ServiceFetchResponse> => {
  const source: CancelTokenSource = axios.CancelToken.source();
  const { tokens } = getTokensFromLocalStorage();
  try {
    const response: AxiosResponse = await axios.get(
      `${siteURL}/auth/users/me/`,
      {
        cancelToken: source.token,
        headers: {
          Authorization: `JWT ${tokens?.accessToken}`,
        },
      }
    );
    if (response.status === 200) {
      return {
        ...responseServiceState,
        HTTPstatus: response.status,
        data: response.data,
      };
    } else {
      return {
        ...responseServiceState,
        HTTPstatus: response?.status,
        isSuccess: false,
        errors: response?.data,
      };
    }
  } catch (e: any) {
    if (e.code === "ERR_NETWORK") return returnNetworkError;
    return {
      ...responseServiceState,
      HTTPstatus: e?.response?.status,
      isSuccess: false,
      errors: e?.response?.data,
    };
  } finally {
    source.cancel();
  }
};

export default getUserFetch;
