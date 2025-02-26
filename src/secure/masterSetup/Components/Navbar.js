import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const menuItems = [
    { path: "/", name: "General Store" },
    { path: "/procurement", name: "Procurement" },
    { path: "/consumption", name: "Consumption" },
    { path: "/finding-item", name: "Finding Item" },
    { path: "/approvals", name: "General Store Approvals" },
    { path: "/stock-overview", name: "Stock Overview" },
    { path: "/item-request", name: "Item Request" },
    { path: "/item-issue", name: "Item Issue" },
    { path: "/direct-sales", name: "Direct Sales" },
  ];

  return (
    <AppBar position="static" sx={{ }}>
      <Toolbar>
        <Box sx={{ display: "flex", gap: 2 }}>
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "#ffeb3b" : "#ffffff",
                fontWeight: isActive ? "bold" : "normal",
              })}
            >
              {item.name}
            </NavLink>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
