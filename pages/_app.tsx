import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Roboto } from "@next/font/google";

import "styles/globals.css";
import Layout from "../components/Layout";
import { UploadContext } from "lib/contexts";
import useUpload from "hooks/useUpload";

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
    <html className={roboto.className}>
      <SessionProvider session={session}>
        <UploadContext.Provider value={providerValue}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UploadContext.Provider>
      </SessionProvider>
    </html>
  );
}
