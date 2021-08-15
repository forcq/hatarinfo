import { Box, Divider, Grow, List, ListItem, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedBorder } from "../../store/border/actions";

const borderClosed = (openingHours) => {
  const currentHour = new Date().getHours();
  const [open, close] = openingHours.split("-");

  return currentHour < open || currentHour >= close ? true : false;
};

const BorderList = ({ borders = [], openBorderInformation }) => {
  const dispatch = useDispatch();

  const handleBorderListItemClick = (border) => {
    dispatch(setSelectedBorder(border));
    openBorderInformation();
  };

  return (
    <List aria-label="borders">
      {borders.map((border) => {
        return (
          <React.Fragment key={border.name}>
            <Grow in={true}>
              <ListItem disabled={borderClosed(border.openingHours)} onClick={() => handleBorderListItemClick(border)} button>
                <div>
                  <div>
                    <Typography display="inline">{border.name.split("-")[0]} </Typography>
                    <Typography display="inline" color="textSecondary">
                      -{border.name.split("-")[1]}
                    </Typography>
                  </div>
                  <Box color="text.secondary">{border.openingHours}h</Box>
                </div>
              </ListItem>
            </Grow>
            <Divider />
          </React.Fragment>
        );
      })}
    </List>
  );
};
export default BorderList;
