import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-card">

      <h2>HeatShield AI</h2>

      <p>AI Powered Urban Heat Risk Prediction Dashboard</p>

      <p>Built using</p>

      <div className="footer-tech">
        <span>React</span>
        <span>FastAPI</span>
        <span>Machine Learning</span>
        <span>OpenWeather API</span>
      </div>

      <div className="footer-bottom">
        © 2026 HeatShield AI. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;