import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';

export function Header() {

    return (
        <div className="container">
            <header className="header-wrapper">
                <h2>JSONIFY</h2>
                <a href="https://github.com/sanjusudheerm/jsonify" target="_blank" className="link">
                    <GitHubIcon/>
                </a>
            </header>
        </div>
    );
}
