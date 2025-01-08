import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Landing from './pages/Home'
import TotpCard from './pages/Asktotp'
import LoginLogout from './pages/Dash'
import OtpInputPage from './pages/Totp'
import QrCodeComponent from './pages/Qr'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing></Landing>}></Route>
        <Route path='/enable/totp' element = {<TotpCard></TotpCard>}></Route>
        <Route path='/dashboard' element={<LoginLogout></LoginLogout>}></Route>
        <Route path='/verify/totp' element = {<OtpInputPage></OtpInputPage>}></Route>
        <Route path='/scan/qr' element = {<QrCodeComponent></QrCodeComponent>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
