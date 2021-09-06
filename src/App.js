import "./App.css";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <HomeScreen />
      </AuthProvider>
    </div>
  );
}

export default App;
