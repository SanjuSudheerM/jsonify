import Button from '@mui/material/Button';

export function Header() {

    return (
        <div className="container">
            <header className="header-wrapper">
                <h2>JSON Formatter</h2>
                <Button variant="contained">Format JSON</Button>
            </header>
        </div>
    );
}
