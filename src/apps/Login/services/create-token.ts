import { siteURL } from "@/src/lib/envs";
import axios, { AxiosError, AxiosResponse, CancelTokenSource } from "axios";
import { LoginErrors, Tokens, UserAuth } from "../models/login.model";
import { TokenPair } from "./token-service";
interface Response {
  errors?: LoginErrors;
  status?: number;
  isAuthenticated?: boolean;
  data?: TokenPair;
  networkerror?: boolean;
}

interface PostResponse extends Tokens {}

const fetchCreateToken = async (userAuth: UserAuth): Promise<Response> => {
  const source: CancelTokenSource = axios.CancelToken.source();

  try {
    const response: AxiosResponse<PostResponse> = await axios.post(
      `${siteURL}/auth/jwt/create/`,
      userAuth
    );

    return {
      errors: {},
      status: response.status,
      isAuthenticated: response.status === 200,
      data: {
        accessToken: response.data.access,
        refreshToken: response.data.refresh,
      },
    };
  } catch (error: any) {
    console.log(error)
    if (error.code === "ERR_NETWORK") {
      return {
        errors: {},
        networkerror: true,
      };
    }

    const axiosError = error as AxiosError;
    return {
      errors: error.response?.data,
      status: axiosError.response?.status,
      isAuthenticated: false,
    };
  } finally {
    source.cancel();
  }
};

export default fetchCreateToken;
