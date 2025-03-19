import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY; // Clé secrète Google reCAPTCHA

if (!RECAPTCHA_SECRET_KEY) {
  console.error("RECAPTCHA_SECRET_KEY is not defined in the environment variables");
  process.exit(1);
}

// Route d'authentification avec validation du CAPTCHA
app.post("/api/login", async (req, res) => {
  const { email, password, captchaToken } = req.body;

  if (!captchaToken) {
    return res.status(400).json({ error: "CAPTCHA manquant" });
  }

  try {
    // Vérifier le CAPTCHA avec Google
    const captchaRes = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: RECAPTCHA_SECRET_KEY,
          response: captchaToken,
        },
      }
    );

    console.log("CAPTCHA response:", captchaRes.data); // Log the CAPTCHA response

    if (!captchaRes.data.success) {
      return res.status(400).json({ error: "<strong>CAPTCHA invalide</strong>" });
    }

    // Simuler une authentification
    const validEmail = "mohameddani993@gmail.com";
    const validPassword = "danidani";

    if (email === validEmail && password === validPassword) {
      return res.json({ message: "Connexion réussie!" });
    } else {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }
  } catch (error) {
    console.error("Error during CAPTCHA verification:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Serveur sur http://localhost:${PORT}`));

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
    process.exit(1);
  } else {
    throw err;
  }
});
