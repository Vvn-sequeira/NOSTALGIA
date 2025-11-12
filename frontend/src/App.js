
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GetEmail from "./components/Forms/GetEmail"
import Home from "../src/components/Landing/Home"
import { registerLicense } from '@syncfusion/ej2-base';
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import ShowEmail from "./components/ShowEmail/ShowEmail"
import WriteDairy from './components/Dairy/WriteDairy';
import Signup from "./components/auth/Signup";
import Login from './components/auth/Login';
import ShowDiary from './components/ShowDiary/ShowDiary';
import AiEmail from './components/Ai/AiEmail';
import SafeEmail from './components/SafeEmail';
import SetTodo from './components/Todo/SetTodo';
// Registering Syncfusion<sup style="font-size:70%">&reg;</sup> license key
registerLicense("Ngo9BigBOggjHTQxAR8/V1JFaF1cX2hIfEx3R3xbf1x1ZFREallTTnVWUiweQnxTdEBiWH5ccHRQRGRfUkB+WUleYg==");

function App() {
  return (
      <>
       <BrowserRouter>
       <Navbar></Navbar>
       <Routes>
        <Route path='/GetEmail' element={<GetEmail></GetEmail>}></Route>
        <Route path='/ShowEmail' element={<ShowEmail></ShowEmail>}></Route>
        <Route path='/ShowDiary' element={<ShowDiary></ShowDiary>}></Route>
        <Route path='/WriteDairy' element={<WriteDairy></WriteDairy>}></Route>
        <Route path='/SignUp' element={<Signup></Signup>}></Route>
        <Route path='/Login' element={<Login></Login>}></Route>
        <Route path='/logout' element={<Home></Home>}></Route>
        <Route path='/Ai' element={<AiEmail></AiEmail>}></Route>
        <Route path='/amisafe' element={<SafeEmail></SafeEmail>}></Route>
        <Route path='/Settodo' element={<SetTodo></SetTodo>}></Route>
        <Route path='/' element={<Home></Home>}></Route>
       </Routes>
       <Footer></Footer>
       </BrowserRouter>
       </>
  );
}

export default App;
