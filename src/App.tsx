import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Menyu from "./pages/Menyu";
import Comment from "./pages/Comment";
import { useCallback, useState } from "react";
import { useDevToolsBlocker } from "./hooks/useDevToolsBlocker";

function App() {
  // const [blocked, setBlocked] = useState(false);

  // const handleDetect = useCallback(() => {
  //   setBlocked(true);
  //   console.clear();
  // }, []);

  // useDevToolsBlocker(handleDetect);

  return (
    <Routes>
      <Route path="/visit" element={<Home />} />
      <Route path="/menu" element={<Menyu />} />
      <Route path="/comment/:type" element={<Comment />} />
      <Route path="/comment/:type/:stol" element={<Comment />} />
    </Routes>
  );
}

export default App;
