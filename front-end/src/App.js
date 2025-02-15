import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Signup from './components/signup';
import Login from './components/Login';
import PrivateComponent from './components/privateComponent';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import AddProducts from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateComponents from './components/UpdateComponents';
function App() {
  return ( 
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>        
        <Route element={<PrivateComponent/>}>
        <Route path="/" element={<ProductList />}/>
        <Route path="/add" element={<AddProducts />}/>
        <Route path="/update/:id" element={<UpdateComponents />}/>
        <Route path="/logout" element={<h1>Logout Listing Component</h1>}/>
        <Route path="/profile" el ement={<h1>Profile Listing Component</h1>}/>
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