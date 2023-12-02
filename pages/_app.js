import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import NextNProgress from "nextjs-progressbar";
import { DefaultSeo } from "next-seo";
const site = "https://schoolpress.vercel.app/";
const title = "Schoolpress - Your Learning Journey Begins Here!";
const description =
  "choolPress, the leading online Learning Management System (LMS) empowering educators and learners. Explore interactive courses, analytics, and collaborative tools for a holistic learning experience.";

export default function App({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo
        title={title}
        description={description}
        openGraph={{
          type: "website",
          url: site,
          title: title,
          description: description,
          images: [
            {
              url: "/images/schoolpress.png",
              width: 1200,
              height: 630,
              alt: "schoolpress",
            },
          ],
        }}
        twitter={{
          handle: "@schoolpress",
          site: "@schoolpress",
          cardType: "summary_large_image",
          title: title,
          description: description,
          image: "/images/schoolpress.png",
        }}
      />
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
