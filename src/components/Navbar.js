import {Link} from "react-router-dom"

function Navbar() {

    return (
        <nav className="navbar">
            <Link to="/about">HOME</Link>
            <Link to="/api-teste">PROCESSOS</Link> 
            <img width={500} src="https://www.jfpe.jus.br/templates/portalTRF5/images/trf5-completo.svg" alt="Logo" />
        </nav>
    )
}

export default Navbar