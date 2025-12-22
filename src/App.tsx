import { BrowserRouter as Router } from "react-router-dom";
import AppLayout from "./components/Layout/AppLayout";
import RenderRoutes from "./routes/renderRoutes";

function App() {
  return (
    <Router>
      <AppLayout>
        <RenderRoutes />
      </AppLayout>
    </Router>
  );
}

export default App;
