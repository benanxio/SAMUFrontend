import { siteURL } from "@/src/lib/envs";
import axios, { CancelTokenSource } from "axios";
import { NameModels } from "../model";
interface PostResponse {
    errors: any,
    isDeleting: boolean,
    status: number
}
const fetchDeleteCsvdb = async (nameModel: NameModels): Promise<PostResponse> => {
    const source: CancelTokenSource = axios.CancelToken.source();
    try {
        const response = await axios.delete<any>(
            `${siteURL}/api/delete-all-${nameModel}`, {

            cancelToken: source.token,
        }
        );
        return {
            isDeleting: true,
            status: response.status,
            errors: {}
        }
    } catch (e: any) {
        return {
            isDeleting: false,
            status: 0,
            errors: {}
        }

    }


}

export default fetchDeleteCsvdb