import "../styles/stytch.css";
import type { AppProps } from "next/app";
import { StytchB2BProvider, useStytchB2BClient } from "@stytch/nextjs/b2b";
import React from "react";
import Head from "next/head";

const stytch = useStytchB2BClient();
StytchB2BProvider.init({
  publicToken: process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN ?? "",
  cookieOptions: {
    jwtCookieName: `stytch_session_jwt_next_b2b_app`,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="An example Next.js B2B application using Stytch for authentication"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <StytchB2BProvider stytch={stytch}>
        <main>
          <div className="container">
            <Component {...pageProps} />
          </div>
        </main>
      </StytchB2BProvider>
    </>
  );
}
export default MyApp;
