import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CardForm from './pages/Cardform'
import Generate from './pages/Generate'
import CharacterCustomization from './pages/CharacterCustomization'
import CharacterCreation from './pages/CharacterCreation'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element ={<CharacterCustomization/>} />
        <Route path="/login" element={<CardForm />} />
        <Route path="/create" element={<CharacterCreation />} />
        <Route path="/generate" element={<Generate />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App