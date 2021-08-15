import { Menu, MenuItem } from "@material-ui/core";

const ActionMenu = ({ author, open, close, deletion, report, anchorEl }) => {
  return (
    <Menu id="long-menu" anchorEl={anchorEl} keepMounted open={open} onClose={close}>
      {author ? <MenuItem onClick={deletion}>Törlés</MenuItem> : <MenuItem onClick={report}>Jelentés</MenuItem>}
    </Menu>
  );
};

export default ActionMenu;
