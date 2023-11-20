import classes from './TopBar.module.css'
import Navbar from "react-bootstrap/Navbar"
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

const TopBar = (props) => {
    return(
    <>
    <Navbar collapseOnSelect expand="lg" className={classes.topbar}>
      <Container>
      <Navbar.Brand className='d-flex align-items-center'> <img src={'./tennis.png'} alt='tennis ball' style={{width:'30px'}}/><span>Tennis Score Board</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="https://olympics.com/en/news/tennis-rules-regulations-how-to-play-basics" target='_blank'>Rules</Nav.Link>
            <Nav.Link href="https://www.figma.com/file/WwWddB3g5wvzFIMfpuTyn5/Tennis-Score-Board?type=design&node-id=2%3A4&mode=design&t=e8GC5S20uG3azvS0-1" target='_blank'>Original Design</Nav.Link>
            <NavDropdown title="More Projects" id="basic-nav-dropdown" className={classes.drop}>
              <NavDropdown.Item href="https://jersey-database.vercel.app/" target='_blank'>Jersey Database</NavDropdown.Item>
              <NavDropdown.Item href="https://sports-store-nextjs.vercel.app/" target='_blank'>Sports Store</NavDropdown.Item>
              <NavDropdown.Item href="https://react-pets.vercel.app/" target='_blank'>Pet Adoption Center</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://pablosiqueira.github.io/" target='_blank'>
                Portfolio
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
              <Nav.Link href="https://pablosiqueira.github.io/" target='_blank'>By Pablo Siqueira</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
    )
}

export default TopBar