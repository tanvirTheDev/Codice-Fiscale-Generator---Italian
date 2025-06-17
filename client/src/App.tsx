import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import CityDetail from "./components/CityDetail";
import CodeFiscaleContent from "./components/CodeFiscaleContent";
import Form from "./components/Form";
import PostalSearch from "./components/PostalSeach";

function App() {
  useEffect(() => {
    const sendHeight = () => {
      const height = document.documentElement.scrollHeight;
      window.parent.postMessage({ type: "setHeight", height }, "*");
    };

    // Send on load and resize
    window.addEventListener("load", sendHeight);
    window.addEventListener("resize", sendHeight);

    // Also send again after 1 second to catch dynamic content
    const timeout = setTimeout(sendHeight, 1000);

    return () => {
      window.removeEventListener("load", sendHeight);
      window.removeEventListener("resize", sendHeight);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Form />
                <CodeFiscaleContent />
              </>
            }
          />
          <Route path="/postal-code" element={<PostalSearch />} />
          <Route path="/city/:cityName" element={<CityDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
