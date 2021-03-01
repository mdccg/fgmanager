import { useState, useEffect } from 'react';
import './styles.css';

import BarsSolid from './../../assets/icons/BarsSolid';
import CaretDownSolid from './../../assets/icons/CaretDownSolid';
import UserCircleSolid from './../../assets/icons/UserCircleSolid';

// import Logo from './../../assets/images/logo.png';
import SrHadlei from './../../assets/images/sr-Hadlei.jpg';

import Drawer from './../Drawer';
import MenuLateral from './../MenuLateral';

function Header() {
  const [offsetHeight, setOffsetHeight] = useState(0);
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState(null);

  function getOffsetHeight() {
    const header = document.querySelector('.header');
    let { offsetHeight } = header;
    setOffsetHeight(offsetHeight);
  }

  function getSrc() {
    // TODO back-end aqui
    setSrc(SrHadlei);
  }

  useEffect(() => {
    document.body.onresize = getOffsetHeight;
    getOffsetHeight();

    getSrc();
  }, []);

  return (
    <>
      <div className="header unselectable">
        <BarsSolid onClick={() => setOpen(true)} />

        {/* <img src={Logo} alt="FG-Manager" /> */}

        <div className="header-usuario">
          {src ? (
            <div className="header-figure-usuario">
              <img src={src} alt="Usuário" />
            </div>
          ) : <UserCircleSolid />}

          <CaretDownSolid />
        </div>
      </div>

      <div style={{ height: offsetHeight }}>
        </div>

      <Drawer open={open} setOpen={setOpen}>
        <MenuLateral />
      </Drawer>
    </>
  );
}

export default Header;