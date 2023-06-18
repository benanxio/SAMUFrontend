import { siteURL } from "@/src/lib/envs";
import axios, { CancelTokenSource } from "axios";
import { NameModels } from "../model";
interface DataGetSuccess {
  count?: number;
  next?: null;
  previous?: null;
  results?: any[];
}
interface GetResponse {
  errors?: any;
  isSuccess?: boolean;
  status?: number;
  data?: DataGetSuccess;
}
const fetchGetModelData = async (
  nameModel: NameModels
): Promise<GetResponse> => {
  const source: CancelTokenSource = axios.CancelToken.source();

  try {
    const response = await axios.get(
      `${siteURL}/api/get-all-${nameModel}`,
      { cancelToken: source.token }
    );

    return {
      isSuccess: true,
      status: response.status,
      data: response.data,
      errors: {},
    };
  } catch (e: any) {
    return {
      isSuccess: false,
      status: 0,
      errors: e.response.data,
      data: {
        count: 0,
        next: null,
        previous: null,
        results: [],
      },
    };
  }
};

export default fetchGetModelData;
