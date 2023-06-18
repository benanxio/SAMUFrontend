import { siteURL } from "@/src/lib/envs";
import axios, { CancelTokenSource } from "axios";
import { RegisterErrors, UserRegisterData } from "../models/register.models";
interface Response {
  errors?: RegisterErrors;
  isCreated?: boolean;
}
export const registerFetch = async (user: UserRegisterData) => {
  const source: CancelTokenSource = axios.CancelToken.source();

  try {
    const response = await axios.post(`${siteURL}/auth/users/`, user, {
      cancelToken: source.token,
    });
    if (response.status == 201) {
        return {
        isCreated: true,
        errors: {},
      };
    } else {
      return {
        isCreated: false,
        errors: response.data,
      };
    }
  } catch (error: any) {
      console.log(error);
    return {
      isCreated: false,
      errors: error.response.data,
    };
  } finally {
    source.cancel();
  }
};
