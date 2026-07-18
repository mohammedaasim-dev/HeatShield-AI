import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">

       <img
                src="/logo.webp"
                alt="HeatShield AI Logo"
                className="logo"
            />


      <div className="navbar-left">
        <div className="logo-circle"></div>

        <div>
          <h1>HeatShield AI</h1>
          <p>AI Powered Urban Heat Risk Prediction Dashboard</p>
        </div>
      </div>

      

    </header>
  );
}

export default Navbar;