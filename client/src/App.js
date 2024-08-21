import './App.css';
import Contact from './components/contact/Contacts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Contact />
      <ToastContainer />
    </div>
  );
}

export default App;
