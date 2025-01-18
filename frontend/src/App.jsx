import "./App.css";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from "./Components/Home";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Create } from "./Components/Create";
import { Read } from "./Components/Read";
import { Update } from "./Components/Update";

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/create" element={<Create/>}/>
    <Route path="/read/:ID" element={<Read/>}/>
    <Route path="/edit/:ID" element={<Update/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
