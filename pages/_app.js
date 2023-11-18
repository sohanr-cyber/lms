import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }) {
  return (
    <>
      {" "}
      <NextNProgress height={3} />
      <Provider store={store}>
        <GoogleOAuthProvider clientId="182276852693-qkrjpntbo95umfsgphvclpgr8kp56kci.apps.googleusercontent.com">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </GoogleOAuthProvider>
      </Provider>
    </>
  );
}
