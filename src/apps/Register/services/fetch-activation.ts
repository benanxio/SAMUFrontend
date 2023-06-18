import { siteURL } from "@/src/lib/envs";
import axios, { AxiosError, CancelTokenSource } from "axios";
import { DataActivation, DataResponseFetch } from "../models/register.models";

const fetchActivation = async (
  data: DataActivation
): Promise<DataResponseFetch> => {
  const source: CancelTokenSource = axios.CancelToken.source();
  try {
    const response = await axios.post(
      `${siteURL}/auth/users/activation/`,
      data,
      {
        cancelToken: source.token,
      }
    );
    if (response.status === 204) {
      return {
        state: 204,
        isSuccess: true,
        errors: {},
      };
    } else {
      return {
        state: 400,
        isSuccess: false,
        errors: response.data,
      };
    }
  } catch (error: any) {
    const axiosError: any = error as AxiosError;
    if (axiosError.response?.status === 400) {
      console.log(error.response.data);

      return {
        state: 400,
        isSuccess: false,
        errors: error.response.data,
      };
    } else if (axiosError.response?.status === 403) {
      console.log(error.response.data);

      return {
        state: 403,
        isSuccess: false,
        errors: error.response.data,
      };
    } else {
      return {
        state: 500,
        isSuccess: false,
        errors: error.response.data,
      };
    }
  } finally {
    source.cancel();
  }
};

export default fetchActivation;
