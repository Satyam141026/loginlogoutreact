
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css';
import { File1 } from './File1';
import Error404 from './Pages/Error404';
import { Login } from './Pages/Login';






function App() {



  
  return (
    <div className="App">
      
<Router>
<Routes>
<Route path="/" element={ <Login/>} />  
<Route path="/File" element={ <File1/>} /> 
<Route path="/File" element={ <Error404/>} /> 
</Routes>
</Router>



    </div>
  );
}

export default App;
