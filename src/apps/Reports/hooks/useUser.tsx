import { RootState } from "@/src/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../User/redux/useCases/get-user";

const useUser = () => {
  const dispatch = useDispatch();
  const {
    email,
    nickname,
    first_name,
    last_name,
    date_joined,
    is_active_from_admin,
    isLoading,
  } = useSelector((state: RootState) => state.User);

  const loadUser = async () => {
    await getUser(dispatch);
  };

  return {
    loadUser,
    user: {
      email,
      nickname,
      first_name,
      last_name,
      date_joined,
      is_active_from_admin,
    },
    isLoadingUser: isLoading,
  };
};

export default useUser;
