import { siteURL } from "@/src/lib/envs";
import axios, { CancelTokenSource } from "axios";
import { DataResponseFetch, ResetPasswordAuth } from "../models";

const resetPasswordFetch = async (data: ResetPasswordAuth): Promise<DataResponseFetch> => {

    const source: CancelTokenSource = axios.CancelToken.source();
    try {
        const response = await axios.post(
            `${siteURL}/users/reset_password_confirm/`,
            data,
            {
                cancelToken: source.token,
            }
        );
        if (response.status === 204) {
            return {
                state: response.status,
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
        return {
            state: 0,
            isSuccess: false,
            errors: {},
        };
    } finally {
        source.cancel();
    }
};

export default resetPasswordFetch