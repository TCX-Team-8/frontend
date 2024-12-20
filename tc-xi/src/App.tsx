import './App.css'
import { AuthProvider } from "./Context/AuthContext";
import AppRoutes from "./Routes/AppRoutes";

function App() {
 

  return (
      <AuthProvider>
      <AppRoutes />
      </AuthProvider>
  )
}

export default App
