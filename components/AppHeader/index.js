import { AppBar, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import { useState } from "react";
import styles from "./app-header.module.scss";
import Sidebar from "./Sidebar";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";

const AppHeader = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const style = {
    justifyContent: router.asPath === "/" ? "flex-end" : "space-between",
  };

  return (
    <>
      <AppBar position="static">
        <div className={styles.container} style={style}>
          {router.asPath === "/" ? null : (
            <IconButton edge="start" color="inherit" aria-label="home">
              <Link href="/" passHref>
                <HomeOutlinedIcon />
              </Link>
            </IconButton>
          )}
          <IconButton onClick={() => setDrawerOpen(true)} edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </div>
      </AppBar>

      <Sidebar open={drawerOpen} close={() => setDrawerOpen(false)} />
    </>
  );
};

export default AppHeader;
