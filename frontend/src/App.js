import logo from './logo.svg';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
   <>
   <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/signUp" element={<RegisterPage/>} />
        </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
