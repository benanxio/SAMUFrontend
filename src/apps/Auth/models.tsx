export interface ResetPasswordAuth {
  uid?: string;
  token?: string;
  new_password?: string;
  re_new_password?: string;
}


export interface AuthStateType {
  isLoading?: boolean;
  isUpdatedPassword?: boolean
  isUserIsActivatedWithAdmin?: false
  isUserActivatedwithEmail?: false
  errors?: AuthErrors
}

export interface AuthErrors {
  detail?: string
}
export interface DataResponseFetch {
  state?: number;
  isSuccess?: boolean;
  errors?: AuthErrors;
}