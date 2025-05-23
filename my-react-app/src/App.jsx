import { Routes, Route } from 'react-router-dom';
import Home from './home';
import About from './about';
import Menu from './menu';
import OrderList from './order';
import Contact from './contact';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/order" element={<OrderList />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default App;
