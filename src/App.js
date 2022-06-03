
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

import { File1 } from './File1';
import Error404 from './Pages/Error404';
import Load from './Pages/Load';


import { Login } from './Pages/Login';
import Scroll1 from './Pages/Scrool1';
import PracticalLogin from './PracticalLogin';
import Practicalupload from './Practicalupload';
import { ReadFetch } from './ReadFetch';
import ScrollScript from './ScrollScript';


function App() {



  
  return (
    <div className="App">

<Router>
<Routes>
<Route path="/" element={ <Scroll1/>} /> 
<Route path="/Load" element={ <Load/>} /> 
<Route path="/readfetch" element={ <ReadFetch/>} /> 
<Route path="/Login" element={ <PracticalLogin/>} />  
<Route path="/upload" element={ <Practicalupload/>} />  
<Route path="/Login" element={ <Login/>} />  
<Route path="/File" element={ <File1/>} /> 
<Route path="/File" element={ <Error404/>} /> 
</Routes>
</Router>



    </div>
  );
}

export default App;
