import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Outlet, useNavigate } from "react-router-dom";
import TalesOfMidEarth from "../../../src/public/lotrtome.png";

interface Props {
  mobWindow?: () => Window;
}

const drawerWidth = 240;
const navItems = ["Home", "Logout"];

export default function Nav(props: Props) {
  const navigate = useNavigate();
  const { mobWindow } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const logUserOut = async (): Promise<void> => {
    const response = await fetch("http://localhost:3000/users/logout", {
      method: "DELETE",
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);
    console.log(response.status);
    if (response.status === 200) {
      window.location.reload();
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <img style={{ width: "150px" }} src={TalesOfMidEarth} />
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              onClick={
                item === "Logout" ? () => logUserOut() : () => navigate("/")
              }
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    mobWindow !== undefined ? () => mobWindow().document.body : undefined;

  return (
    <>
      <AppBar
        style={{
          backgroundColor: "#0A2D27",
          textAlign: "center",
        }}
        component="nav"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ ml: 1, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              textAlign: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div style={{ width: "50%" }}>
              {navItems.map((item) => (
                <Button
                  key={item}
                  onClick={
                    item === "Logout" ? () => logUserOut() : () => navigate("/")
                  }
                  sx={{ color: "#fff", mr: 4 }}
                >
                  {item}
                </Button>
              ))}
            </div>
            <div style={{ width: "50%" }}>
              <img style={{ width: "150px" }} src={TalesOfMidEarth} />
            </div>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Outlet />
    </>
  );
}
