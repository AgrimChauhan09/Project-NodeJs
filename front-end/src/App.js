import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Signup from './components/signup';
import Login from './components/Login';
import PrivateComponent from './components/privateComponent';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>
        
        <Route element={<PrivateComponent/>}>
        <Route path="/" element={<h1>Product Listing Component</h1>}/>
        <Route path="/add" element={<h1>Add Product Listing Component</h1>}/>
        <Route path="/update" element={<h1>Update Listing Component</h1>}/>
        <Route path="/lo  gout" element={<h1>Logout Listing Component</h1>}/>
        <Route path="/profile" element={<h1>Profile Listing Component</h1>}/>
        </Route>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/Login" element={<Login />}/>

      </Routes>
     
      </BrowserRouter>
      <Footer />
    </div>
  ); 
}

export default App;
