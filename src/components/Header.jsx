import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';

export function Header({toggleTabs}: props) {

    return (
        <div className="container">
            <header className="header-wrapper">
                <h2>JSONIFY</h2>
                <div className="menu">
                    <span onClick={toggleTabs}>Tabs</span>
                    <a href="https://github.com/sanjusudheerm/jsonify" target="_blank" className="link">
                        <GitHubIcon/>
                    </a>
                </div>
            </header>
        </div>
    );
}
