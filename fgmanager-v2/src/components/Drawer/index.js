import './styles.css';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

function Drawer({ open, setOpen, children }) {
  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(open);
  };

  return (
    <SwipeableDrawer
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}>
      {children}
    </SwipeableDrawer>
  );
}

export default Drawer;