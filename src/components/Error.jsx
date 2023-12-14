/* eslint-disable no-restricted-globals */
/* eslint-disable react/no-unescaped-entities */
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useEffect } from "react";
import { ErrorContext } from "../App";
export default function Error() {
  let { error, setError } = useContext(ErrorContext);
  setError(true);
  useEffect(() => {
    if (error) {
      document.body.style.cssText = "background-image:none !important";
    }
  }, [error]);
  function where(e) {
    e.preventDefault();
    location.href = "/bmsystem";
  }
  return (
    <div height={"100vh"}>
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <section className="error-page section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3 col-12">
              <div className="error-inner">
                <h1>
                  404<span>Oop's sorry we can't find that page!</span>
                </h1>
                <p style={{ color: "black" }}>
                  The page that your are looking for is Not Found
                </p>
                <form className="search-form">
                  <button
                    onClick={(e) => where(e)}
                    className="btn"
                    type="submit"
                  >
                    Go Back
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
