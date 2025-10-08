import { BrowserRouter } from "react-router-dom";
import "@fontsource/poppins";
import AppRoutes from "./Routes/Router";

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
