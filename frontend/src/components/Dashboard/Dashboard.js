/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable eqeqeq */
import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import styles from "./Dashboard.module.css";
import { ReactComponent as HomeSVG } from "../icons/home.svg";
import { ReactComponent as LayerSVG } from "../icons/layer.svg";
import { ReactComponent as SunSVG } from "../icons/sun.svg";
import { ReactComponent as MoonSVG } from "../icons/moon.svg";
import { ReactComponent as HomeDarkSVG } from "../icons/darkhome.svg";
import { ReactComponent as LayerDarkSVG } from "../icons/darklayer.svg";
import { ReactComponent as SunDarkSVG } from "../icons/darksun.svg";
import { ReactComponent as MoonDarkSVG } from "../icons/darkmoon.svg";
import { useDispatch, useSelector } from "react-redux";
import Main from "../Main/Main";

const mdTheme = createTheme();

function DashboardContent() {
  const dispatch = useDispatch();
  const color = useSelector((state) => state.color);
  const theme = useSelector((state) => state.theme);
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <div className={styles.flexContainer} style={{ background: color }}>
          <div className={styles.flexLabel}>
            {theme == "light" ? (
              <>
                <HomeSVG />
                <br />
                <LayerSVG />
              </>
            ) : (
              <>
                <HomeDarkSVG />
                <br />
                <LayerDarkSVG />
              </>
            )}
          </div>
          <div
            className={
              styles.flexLabel +
              " " +
              (theme == "light" ? styles.border : styles.borderDark)
            }
          >
            {theme == "light" ? (
              <>
                <SunSVG />
                <br />
                <MoonSVG
                  style={{ cursor: "pointer", marginBottom: 10 }}
                  onClick={() =>
                    dispatch({
                      type: "CHANGE_THEME",
                      payload: ["dark", "#3339CD"],
                    })
                  }
                />
              </>
            ) : (
              <>
                <SunDarkSVG
                  style={{ cursor: "pointer", margin: "20 0 15 0" }}
                  onClick={() =>
                    dispatch({
                      type: "CHANGE_THEME",
                      payload: ["light", "#ffffff"],
                    })
                  }
                />
                <br />
                <MoonDarkSVG />
              </>
            )}
          </div>
        </div>
        <Box
          component="main"
          sx={{
            backgroundColor: color,
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Main />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
