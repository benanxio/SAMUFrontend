import NotificationSlice from "@/src/apps/Common/redux/NotificationSlice";
import AuthSlice from "../apps/Auth/redux/AuthSlice";
import LoginSlice from "../apps/Login/redux/LoginSlice";
import RegisterSlice from "../apps/Register/redux/RegisterSlice";
import UploadcsvSlice from "../apps/UploadCsv/redux/UploadcsvSlice";
import userSlice from "../apps/User/redux/userSlice";

const Slices = {
  Notification: NotificationSlice,
  Login: LoginSlice,
  Register: RegisterSlice,
  Auth: AuthSlice,
  Upload: UploadcsvSlice,
  User: userSlice,
};

export default Slices;
