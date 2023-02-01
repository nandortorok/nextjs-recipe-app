import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Roboto } from "@next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import NProgress from "nprogress";
import { ThemeProvider } from "next-themes";
import "nprogress/nprogress.css";

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
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleComplete = () => NProgress.done();

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <style jsx global>{`
        :root {
          --font-roboto: ${roboto.style.fontFamily};
        }
      `}</style>
      <ThemeProvider enableSystem={true} attribute="class">
        <SessionProvider session={session}>
          <UploadContext.Provider value={providerValue}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </UploadContext.Provider>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}
