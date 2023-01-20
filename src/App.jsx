import './App.css';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import {Header} from "./components/Header";
import { JsonTab }  from './components/Tab';
import { JSONEditor} from "./components/Editor";

function App() {
    return (
        <div>
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
        </div>
    );
}

export default App;
