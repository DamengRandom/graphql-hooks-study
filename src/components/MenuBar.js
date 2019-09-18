import React, { useContext, useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

const Menubar = () => {
  const { user, logout } = useContext(AuthContext);
  const { pathname } = window.location;
  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);
  const handleItemClick = ({ name }) => setActiveItem(name);

  const MenubarWrapper = user ? (
    <div>
        <Menu pointing secondary size="massive" color="teal">
          <Menu.Item
            name={user.username}
            active
            as={Link}
            to="/"
          />
          <Menu.Menu position="right">
            <Menu.Item
              name='logout'
              onClick={logout}
            />
          </Menu.Menu>
        </Menu>
      </div>
  ) : (
    <div>
        <Menu pointing secondary size="massive" color="teal">
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to="/"
          />
          <Menu.Menu position="right">
            <Menu.Item
              name='login'
              active={activeItem === 'login'}
              onClick={handleItemClick}
              as={Link}
              to="/login"
            />
            <Menu.Item
              name='signup'
              active={activeItem === 'signup'}
              onClick={handleItemClick}
              as={Link}
              to="/signup"
            />
          </Menu.Menu>
        </Menu>
      </div>
  );

  return MenubarWrapper;
}

export default Menubar;
