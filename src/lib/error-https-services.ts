/*
interface PostResponse {
  errors: any;
  data: any;
  status: number;
  isSucess: boolean;
}

interface GetResponse {
  errors?: any;
  isSuccess?: boolean;
  data?: any;
  networkError?: boolean;
}
//
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
//
interface PostResponse {
    errors: any,
    isDeleting: boolean,
    status: number
}
//
interface Response {
    errors?: RegisterErrors;
    isCreated?: boolean;
}
export interface RegisterErrors {
    detail?: string;
    email?: string[];
    password?: string[];
    re_password?: string[];
    nickname?: string[];
    non_field_errors?: string[];
}
  //
interface Response {
    errors?: LoginErrors;
    status?: number;
    isAuthenticated?: boolean;
    data?: TokenPair;
    networkerror?: boolean;
}

*/

// errors: {
//         error_type: "Error de red",
//         message: "Servidor no disponible por ahora.",
//        },
//

export const returnNetworkError = {
  networkError: true,
  errors: {},
  data: {},
  HTTPstatus: 0,
  isSuccess: false,
};

export const responseServiceState = {
  networkError: false,
  errors: {},
  data: {},
  HTTPstatus: 200,
  isSuccess: true,
};
type HttpStatusCode =
  | 200 // OK
  | 201 // Created
  | 204 // No Content
  | 400 // Bad Request
  | 401 // Unauthorized
  | 403 // Forbidden
  | 404 // Not Found
  | 500 // Internal Server Error
  | 502 // Bad Gateway
  | 503; // Service Unavailable

export interface ServiceFetchResponse {
  networkError: boolean;
  errors: any;
  data: any;
  isSuccess: boolean;
  HTTPstatus: number;
}
