import Grid from '@mui/material/Grid';

export function Footer() {

    return (<div className="footer-wrapper">
        <div className="container">
            <Grid container spacing={2}>
                <Grid item xs={12} lg={4}>
                    <h2>JSONIFY</h2>
                    <p className="footer-description">One other JSON Formatter, which tidies up JSON data with proper indentation and syntax
                        highlighting for improved readability.</p>
                </Grid>
            </Grid>
        </div>
    </div>)
}