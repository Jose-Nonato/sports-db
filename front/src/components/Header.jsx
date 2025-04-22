import '../styles/header.css'
import Logo from '../assets/site_logo_dark.svg'


export default function MainHeader() {
    return(
        <div className='header'>
            <img src={Logo} alt="Logo DBSports" width='20%'/>
        </div>
    )
}
