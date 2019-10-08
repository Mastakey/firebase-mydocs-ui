import React, {Fragment} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { Link as RouterLink } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
const styles = {
  tag: {
    margin: 5
  }
};
function TagList(props) {
    const handleClick = () => {

    }
    const tags = props.tags;
    const classes = props.classes;
    const markup = tags.map(tag => {
        const link = `/tag/${tag}`;
        return (
            <RouterLink to={link} key={tag}>
                <Chip label={tag} className={classes.tag} onClick={handleClick} />
            </RouterLink>
        )
    })
    return (
        <Fragment>
            {markup}
        </Fragment>
    );
}

export default withStyles(styles)(TagList);
