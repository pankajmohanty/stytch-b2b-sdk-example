import "../styles/stytch.css";
import type { AppProps } from "next/app";
import { StytchB2BProvider, createStytchB2BUIClient } from "@stytch/nextjs/b2b";
import React from "react";
import Head from "next/head";

const stytch = createStytchB2BUIClient(
  process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN ?? "",
  {
    cookieOptions: {
      jwtCookieName: `stytch_session_jwt_next_b2b_app`,
      opaqueTokenCookieName: `stytch_session_next_b2b_app`,
    },
  }
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
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
