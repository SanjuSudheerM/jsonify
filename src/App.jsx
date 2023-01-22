import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import {JsonTab} from './components/Tab';
import {JSONEditor} from "./components/Editor";
import {DBConfig} from "./config/DBConfig";
import {initDB} from 'react-indexed-db';
import {ErrorBoundary} from './ErrorBoundary'

function App() {
    initDB(DBConfig)

    return (
        <div>
            <ErrorBoundary>
                <div className="app-wrapper container">
                    <h1 className="mega-title">JSONIFY</h1>
                    <h5 className="sub-title">One another JSON Formatter</h5>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card variant="outlined">
                                <JsonTab/>
                                <JSONEditor/>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </ErrorBoundary>
        </div>
    );
}

export default App;
