import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Navigationbar } from "./components/NAvigationbar";
import { Dashboard } from "./components/Dashboard";
import { Contact } from "./components/Contact";
import { ToastContainer } from "react-toastify";
import { ContactList } from './components/ContactList';
import { ViewContact} from './components/ViewContact';
import { Feedback} from './components/Feedback';

function App() {
 return (
    <BrowserRouter>
      <Navigationbar/>
      <Routes>

        <Route path="/" element={<Dashboard/>} />
        <Route path="/add-contact" element={< Contact/>} />
       <Route path="/contacts-list" element={<ContactList />} />
       <Route path="/view-contact/:id" element={< ViewContact/>} />
       <Route path="/feedback" element={<Feedback />} />
        </Routes>
       <ToastContainer/>
    </BrowserRouter>
  )
}

export default App
