import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<>Remote 1</>} />
      <Route path="/test" element={<>Remote testtt asds</>} />
    </Routes>
  );
}
