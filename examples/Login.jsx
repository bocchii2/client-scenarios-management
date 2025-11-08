import React, { useState } from "react";
import {
  Button,
  Typography,
  Grid,
  Box,
  Divider,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { PublicClientApplication } from "@azure/msal-browser";
import logo from "../assets/img/logo_login.png";
import microsoft from "../assets/img/Microsoft_logo.png";
import { config } from "../config/ConfigMicrosoft";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { getEstudiantePorCedula, loginSbe } from "../axios/axios_client";
import Swal from "sweetalert2";

export default function Login() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalidStudent, setIsInvalidStudent] = useState(false);
  const { setUser, setToken } = useStateContext();

  // 🔹 Extraer cédula desde correo institucional (ej: u1311836587@uleam.edu.ec → 1311836587)
  function extractCedulaFromUsername(username) {
    const parts = username.split("@");
    if (parts.length === 2 && parts[0].length > 1) {
      return parts[0].slice(1);
    }
    return null;
  }

  const publicClientApplication = new PublicClientApplication({
    auth: {
      clientId: config.appId,
      redirectUri: config.redirectUri,
      authority: config.authority,
    },
  });
  publicClientApplication.initialize();

  async function login() {
    try {
      setIsLoading(true);
      setError(null);

      await publicClientApplication.clearCache();

      // login con Microsoft
      const loginResponse = await publicClientApplication.loginPopup({
        scopes: config.scopes,
        prompt: "select_account",
      });

      console.log("Response MS:", loginResponse);

      const accessToken = loginResponse.accessToken;
      const { name, username } = loginResponse.account;
      const cedula = extractCedulaFromUsername(username);

      if (!cedula) throw new Error("No se pudo extraer la cédula");

      // Obtener datos desde Bienestar
      const estudiante = await getEstudiantePorCedula(cedula, accessToken);

      if (!estudiante || estudiante.estadoMatricula !== "ESTÁ MATRICULADO") {
        setIsInvalidStudent(true);
        throw new Error("Usted no es estudiante de pregrado de la Uleam");
      }

      // Payload completo hacia Laravel
      const payload = {
        email: username,
        nombres: name,
        cedula,
        // accessToken,
      };

      const data = await loginSbe(payload);

      const userData = {
        id: data.id,
        name: data.name,
        email: data.email,
        id_persona: data.id_persona,
      };

      setUser(userData);
      setToken(data.token);

      sessionStorage.setItem("ACCESS_TOKEN", data.token);
      sessionStorage.setItem("USER_DATA", JSON.stringify(userData));
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error en el inicio de sesión",
        text: err.message || "No se pudo autenticar",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#144985",
      });
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={11} sm={8} md={5} lg={4}>
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 3,
              textAlign: "center",
              backgroundColor: "#fff",
              maxWidth: 400,
              margin: "0 auto",
            }}
          >
            <Box mb={3}>
              <img
                src={logo}
                alt="Uleam Logo"
                style={{ maxWidth: "90%", height: "auto" }}
              />
            </Box>

            {isLoading ? (
              <CircularProgress sx={{ color: "#144985", mb: 2 }} />
            ) : isInvalidStudent ? (
              <Alert severity="error">
                Usted no es estudiante de pregrado de la Uleam
              </Alert>
            ) : (
              <Button
                fullWidth
                onClick={login}
                sx={{
                  border: "2px solid #144985",
                  borderRadius: "10px",
                  backgroundColor: "#fff",
                  color: "#144985",
                  fontWeight: "bold",
                  py: 1.5,
                  "&:hover": { backgroundColor: "#144985", color: "#fff" },
                }}
                startIcon={
                  <img
                    src={microsoft}
                    alt="Microsoft"
                    style={{ width: 24, height: 24 }}
                  />
                }
              >
                Iniciar sesión con Microsoft
              </Button>
            )}

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Divider sx={{ my: 3 }} />

            <Typography
              variant="caption"
              sx={{
                fontWeight: "bold",
                fontSize: "0.75rem",
                color: "#144985",
                fontStyle: "italic",
                display: "block",
                textAlign: "center",
              }}
            >
              | Sistema de Bienestar Estudiantil | <br /> | Área de Datos y
              Estadísticas |
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
