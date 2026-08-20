import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import Category from "./pages/Category";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/blog/:id"
          element={<BlogDetails />}
        />

        <Route
          path="/category/:name"
          element={<Category />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;