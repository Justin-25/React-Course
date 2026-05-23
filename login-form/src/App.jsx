import { useState } from 'react'
import { Login } from './components/Login'

function App() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Login
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
    </>
  )
}

export default App