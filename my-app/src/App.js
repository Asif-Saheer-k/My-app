import {BrowserRouter,Routes,Route} from "react-router-dom"
import HomePage from "./pages/HomePage";
import './App.css'
function App() {

  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" exact element={<HomePage/>}></Route>
  </Routes>
  </BrowserRouter>
  );
}

export default App;
