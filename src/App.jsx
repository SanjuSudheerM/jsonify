import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { JsonTab } from "./components/Tab";
import { JSONEditor } from "./components/Editor";
import { DBConfig } from "./config/DBConfig";
import { initDB } from "react-indexed-db";
import { ErrorBoundary } from "./ErrorBoundary";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { TabNameDialog } from "./components/TabNameDialog";
import { useState } from "react";

function App() {
  try {
    initDB(DBConfig);
  } catch (e) {
    console.log(e);
  }
  const [open, setOpen] = useState(false);

  const openTabNameModal = () => {
    setOpen(true);
  };

  return (
    <div>
      <ErrorBoundary>
        <Header />
        <div className="app-wrapper container">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card variant="outlined">
                <JsonTab openRenameTab={openTabNameModal} />
                <JSONEditor />
                <TabNameDialog open={open} setOpen={setOpen} />
              </Card>
            </Grid>
          </Grid>
        </div>
        <Footer />
      </ErrorBoundary>
    </div>
  );
}

export default App;
