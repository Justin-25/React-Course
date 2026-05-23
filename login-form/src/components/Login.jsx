import './Login.css'

export function Login({
  showPassword,
  setShowPassword
}) {

  function togglePassword() {
    setShowPassword(!showPassword)
  }

  return (
    <div className="login-container">
      <p>Hello, welcome to my website</p>
      <div className="input-container">
        <input 
          type="text" 
          placeholder="Email"
          className="input-email"  
        />
      </div>
      <div className="input-container">
        <input 
          type={showPassword 
            ? 'text'
            : 'password' 
          }
          placeholder="Password"
          className="input-password"

        />
        <button
          className="btn-password"
          onClick={togglePassword}
        >
          {showPassword
            ? 'Hide'
            : 'Show'
          }
        </button>
      </div>
      <div className="btn-container">
        <button className="btn">Login</button>
        <button className="btn">Sign Up</button>
      </div>
    </div>
  )
}