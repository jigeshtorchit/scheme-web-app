import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";

const ReactSidebar = ({ sidebarItems, onClick }) => {
  const location = useLocation();

  const renderMenuItems = (items) => {
    return items.map((item) => {
      const isActive = location.pathname === item.url;
      if (item.children && item.children.length > 0) {
        return (
          <Menu
            menuItemStyles={{
              button: ({ level, active }) => {
                if (level === 0 || level === 1) {
                  return {
                    backgroundColor: active ? "#5046e5" : undefined,
                    color: active ? "white" : undefined,

                    "&:hover": {
                      backgroundColor: "#5046e5",
                      color: "#fff",
                    },
                  };
                }
              },
            }}
          >
            <SubMenu
              className="textDecoration-none"
              active={isActive}
              rootStyles={{
                backgroundColor: "#fff",
                color: "black",
                ":hover": {
                  color: "white",
                },
              }}
              key={item.id}
              title={item.label}
              label={item.label}
              icon={item.icon}
            >
              {renderMenuItems(item.children)}
            </SubMenu>
          </Menu>
        );
      } else {
        return (
          <Menu
            menuItemStyles={{
              button: ({ level, active }) => {
                if (level === 0 || level === 1) {
                  return {
                    backgroundColor: active ? "#5046e5" : undefined,
                    color: active ? "white" : undefined,

                    "&:hover": {
                      backgroundColor: "#5046e5",
                      color: "#fff",
                    },
                  };
                }
              },
            }}
          >
            <Link className="textDecoration-none" to={item.url}>
              <MenuItem
                onClick={onClick}
                className="textDecoration-none fs-15"
                active={isActive}
                rootStyles={{
                  backgroundColor: "#fff",
                  color: "black",
                  borderRadius: "15px",
                  ":hover": {
                    color: "black",
                    backgroundColor: "blue",
                  },
                }}
                hoverStyles={{
                  color: "white",
                  backgroundColor: "blue",
                }}
                key={item.id}
                icon={item.icon}
              >
                {item.label}
              </MenuItem>
            </Link>
          </Menu>
        );
      }
    });
  };

  return (
    <div className="mt-2">
      <Sidebar
        rootStyles={{
          backgroundColor: "#fff",
          color: "black",
          fontWeight: "bolder",
          borderColor: "#fff",
          borderRadius: "15px",
        }}
      >
        <Menu iconShape="circle">{renderMenuItems(sidebarItems)}</Menu>
      </Sidebar>
    </div>
  );
};

export default ReactSidebar;
