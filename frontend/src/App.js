import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import "./App.css"; // Import the CSS file for styling

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      setMessage("Veuillez valider le CAPTCHA !");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
        captchaToken,
      });

      setMessage(response.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || "Erreur inconnue");
    }
  };

  return (
    <div className="cyber-background">
      <form className="cyber-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <ReCAPTCHA
          className="cyber-recaptcha small-recaptcha"
          sitekey="6Le1ePkqAAAAAPDqybALQ1Uynrc2XfNdClbYS3Ki"
          onChange={(token) => setCaptchaToken(token)}
        />
        <button type="submit">Se connecter</button>
      </form>
      {message && <p className="captcha-invalid-message">{message}</p>}
    </div>
  );
};

export default App;