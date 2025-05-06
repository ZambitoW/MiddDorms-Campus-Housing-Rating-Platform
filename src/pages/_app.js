import PropTypes from "prop-types";
import "@/styles/globals.css";
import NavBar from "@/components/NavBar";
 
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: { session, pageProps } }) {
  return (
    <div>
      <SessionProvider session={session}>
        <NavBar> </NavBar>
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};
