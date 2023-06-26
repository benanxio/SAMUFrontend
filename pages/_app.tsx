import Notification from "@/src/apps/Common/components/Notification";
import AuthProvider from "@/src/apps/Common/context/AuthContext";
import DataProvider from "@/src/context/DataContext";
import UIProvider from "@/src/context/UIContext";
import { store } from "@/src/redux/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import PrimeReact from "primereact/api";
import "primereact/resources/primereact.min.css";
import "react-toastify/dist/ReactToastify.css";

import "primereact/resources/themes/tailwind-light/theme.css";
PrimeReact.ripple = true;

import { Provider } from "react-redux";
export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <Provider store={store}>
      <DataProvider>
        <AuthProvider>
          <UIProvider>
            <Notification />

            <Component {...pageProps} key={router.route} />
          </UIProvider>
        </AuthProvider>
      </DataProvider>
    </Provider>
  );
}
