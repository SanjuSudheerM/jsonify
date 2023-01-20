import './App.css';
import {JSONEditor} from './Editor';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {Header} from "./components/Header";

function App() {
    return (
        <div>
            <Header/>
            <div className="app-wrapper container">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Card variant="outlined">
                            <JSONEditor/>
                        </Card>
                    </Grid>

                </Grid>
            </div>
        </div>
    );
}

export default App;
