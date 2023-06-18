import { siteURL } from "@/src/lib/envs";
import axios, { AxiosError, CancelTokenSource } from "axios";
import { DataResendActivation } from "../models/register.models";

const fetchResendActivate = async (data: DataResendActivation) => {
  const source: CancelTokenSource = axios.CancelToken.source();
  try {
    const response = await axios.post(
      `${siteURL}/auth/users/resend_activation/`,
      data,
      {
        cancelToken: source.token,
      }
    );
    if (response.status === 204) {
      return {
        errors: {},
        isSuccess: false,
      };
    } else {
      return {
        errors: response.data,
        isSuccess: false,
      };
    }
  } catch (error: any) {
    const axiosError: any = error as AxiosError;
    return {
      errors: error.data.response,
      isSuccess: false,
    };
  } finally {
    source.cancel();
  }
};

export default fetchResendActivate;
