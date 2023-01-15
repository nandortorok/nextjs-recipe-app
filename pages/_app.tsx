import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import "styles/globals.css";
import Layout from "../components/Layout";
import { UploadContext } from "lib/contexts";
import useUpload from "hooks/useUpload";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const providerValue = useUpload();

  return (
    <SessionProvider session={session}>
      <UploadContext.Provider value={providerValue}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UploadContext.Provider>
    </SessionProvider>
  );
}
