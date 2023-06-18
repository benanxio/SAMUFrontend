import { siteURL } from "@/src/lib/envs";
import axios, { AxiosResponse, CancelTokenSource } from "axios";
import { getTokensFromLocalStorage } from "./token-service";

const fetchRefreshToken = async () => {
  const source: CancelTokenSource = axios.CancelToken.source();
  const { tokens } = getTokensFromLocalStorage();
  try {
    const response: AxiosResponse = await axios.post(
      `${siteURL}/jwt/refresh/`,
      {
        refresh: tokens?.refreshToken,
      },
      {
        cancelToken: source.token,
      }
    );

    return {
      isSuccess: true,
      status: response.status,
    };
  } catch (error) {
    return {
      isSuccess: false,
      status: 401,
    };
  } finally {
    source.cancel();
  }
};

export default fetchRefreshToken;
