import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import {JsonTab} from './components/Tab';
import {JSONEditor} from "./components/Editor";
import {DBConfig} from "./config/DBConfig";
import {initDB} from 'react-indexed-db';
import {ErrorBoundary} from './ErrorBoundary'
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";

function App() {
    initDB(DBConfig)

    return (
        <div>
            <ErrorBoundary>
                <Header/>
                <div className="app-wrapper container">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card variant="outlined">
                                <JsonTab/>
                                <JSONEditor/>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
                <Footer/>
            </ErrorBoundary>
        </div>
    );
}

export default App;
