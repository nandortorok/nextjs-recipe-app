import "../styles/globals.css";
import type { AppProps } from "next/app";

import Layout from "../components/layout";
import { UploadContext } from "lib/contexts";
import useUpload from "hooks/useUpload";

export default function MyApp({ Component, pageProps }: AppProps) {
  const providerValue = useUpload();

  return (
    <UploadContext.Provider value={providerValue}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UploadContext.Provider>
  );
}
