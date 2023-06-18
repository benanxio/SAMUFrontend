import { siteURL } from "@/src/lib/envs";
import axios, { AxiosError, AxiosResponse, CancelTokenSource } from "axios";

const fetchVerifyToken = async (accessToken: string): Promise<boolean> => {
  const source: CancelTokenSource = axios.CancelToken.source();

  try {
    const response: AxiosResponse = await axios.post(
      `${siteURL}/auth/jwt/verify/`,
      {
        token: accessToken,
      },
      {
        cancelToken: source.token,
      }
    );

    return response.status === 200;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 400) {
      return false;
    } else {
      return false;
    }
  } finally {
    source.cancel();
  }
};

export default fetchVerifyToken;
