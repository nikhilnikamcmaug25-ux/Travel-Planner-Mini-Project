import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Navigationbar } from "./components/NAvigationbar";
import { Dashboard } from "./components/Dashboard";
import { Contact } from "./components/Contact";
import { ToastContainer } from "react-toastify";
import { ContactList } from './components/ContactList';
function App() {
 return (
    <BrowserRouter>
      <Navigationbar/>
      <Routes>

        <Route path="/" element={<Dashboard/>} />
        <Route path="/add-contact" element={< Contact/>} />
       <Route path="/contacts-list" element={<ContactList />} />
        </Routes>
       <ToastContainer/>
    </BrowserRouter>
  )
}

export default App
