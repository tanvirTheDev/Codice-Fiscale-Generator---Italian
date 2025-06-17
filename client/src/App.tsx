import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import CityDetail from "./components/CityDetail";
import CodeFiscaleContent from "./components/CodeFiscaleContent";
import Form from "./components/Form";
import PostalSearch from "./components/PostalSeach";

function App() {
  useEffect(() => {
    const updateHeight = () => {
      const height = document.documentElement.scrollHeight;
      window.parent.postMessage({ frameHeight: height }, "*");
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
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
