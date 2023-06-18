import { RootState } from "@/src/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataActivation } from "../models/register.models";
import activateUser from "../redux/useCases/activate-user";

const useActivateUser = () => {
  
  const dispatch = useDispatch();
  const { isLoading, errors, isActivateEmail } = useSelector(
    (state: RootState) => state.Register
  );
  const activateUserWithEmail = async (data: DataActivation) => {
    await activateUser(data, dispatch);
  };

  useEffect(() => {
    window.location.href = "/login";
  }, [isActivateEmail]);
  return {
    activateUserWithEmail,
    isLoadingActivate: isLoading,
    errors,
    isActivateEmail,
  };
};

export default useActivateUser;
