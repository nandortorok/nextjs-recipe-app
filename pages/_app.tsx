import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import "styles/globals.css";
import Layout from "../components/Layout";
import { UploadContext } from "lib/contexts";
import useUpload from "hooks/useUpload";

import { Roboto } from "@next/font/google";

const roboto = Roboto({
  weight: ["100", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "optional",
});

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const providerValue = useUpload();

  return (
    <>
      <style jsx global>{`
        :root {
          --font-roboto: ${roboto.style.fontFamily};
        }
      `}</style>
      <SessionProvider session={session}>
        <UploadContext.Provider value={providerValue}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UploadContext.Provider>
      </SessionProvider>
    </>
  );
}
