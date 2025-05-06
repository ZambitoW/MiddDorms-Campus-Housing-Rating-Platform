import PropTypes from "prop-types";
import "@/styles/globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer.js";
export default function App({ Component, pageProps }) {
  return (
    <div className="layoutGrid">
      <NavBar />
      <main className="pageContent">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};
