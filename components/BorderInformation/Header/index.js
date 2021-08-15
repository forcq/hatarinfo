import { Box, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import styles from "./header.module.scss";

const Header = ({ closeBorderInformation }) => {
  return (
    <Box bgcolor="white">
      <div className={styles.headerBar}>
        <h3 className={styles.title}>HatárInfó</h3>
        <div className={styles.actionButton}>
          <IconButton onClick={closeBorderInformation}>
            <CloseIcon color="primary" />
          </IconButton>
        </div>
      </div>
    </Box>
  );
};

export default Header;
