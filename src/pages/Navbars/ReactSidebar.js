import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';

const ReactSidebar = ({ sidebarItems , onClick}) => {
    const location = useLocation();


  const renderMenuItems = (items) => {
    return items.map((item) => {
        const isActive = location.pathname === item.url;
      if (item.children && item.children.length > 0) {
        return (
          <SubMenu  className='fs-15 text-bolder' active={isActive} rootStyles={{
            backgroundColor:'#313947',
            color:"white",
            ':hover':{
                color:"black",
 
            }
           
          }}  key={item.id} title={item.label} label={item.label} icon={item.icon}>
            {renderMenuItems(item.children)}
          </SubMenu>
        );
      } else {
        return (
            <Link  className='textDecoration-none color-white'  to={item.url}>
          <MenuItem onClick={onClick} className='fs-15 text-bolder' active={isActive} rootStyles={{
            backgroundColor:'#313947',
            color:"white",
            ':hover':{
                color: 'black',
            }
          }}  key={item.id} icon={item.icon}>
            {item.label}
          </MenuItem>
          </Link>
        );
      }
    });
  };

  return (
    <div>
      <Sidebar  backgroundColor='#313947'  rootStyles={{
        backgroundColor:'#313947',
        color:"white",
        fontWeight:"bolder",
        width:"100%",
        // height:"97vh",
        borderColor:"#313947"
  }}>
        <Menu  iconShape="circle">
          {renderMenuItems(sidebarItems)}
        </Menu>
      </Sidebar>
    </div>
  );
}

export default ReactSidebar;