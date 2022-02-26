import { Router } from "react-router-dom";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return <HomeScreen />;
}

export default App;
