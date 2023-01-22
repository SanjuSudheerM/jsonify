import Button from '@mui/material/Button';

export function Header() {

    return (
        <div className="container">
            <header className="header-wrapper">
                <h2>JSONIFY</h2>
                <Button variant="contained">Format JSON</Button>
            </header>
        </div>
    );
}
