import React, {Fragment} from 'react'
import { Link as RouterLink } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = {
  paper: {
    padding: 10
  },
  header: {
    marginBottom: 10
  },
  mdoc: {}
};

function MdocList(props) {
    const classes = props.classes;
    const mydocs = props.mydocs;
    const mdocList = mydocs.map(mdoc => {
      return <MdocListItem classes={classes} mdoc={mdoc} key={mdoc.id} />;
    });
    return (
      <Fragment>
        <Typography variant="h2" className={classes.header}>
          {props.name}
        </Typography>
        <Grid container spacing={3} className={classes.root}>
          {mdocList}
        </Grid>
      </Fragment>
    );
}

function MdocListItem(props){
    const classes = props.classes;
    const mydoc = props.mdoc;
    let link = `/mdoc/${mydoc.id}`;
    return (
        <Grid item xs={12} sm={3} className={classes.mdoc}>
            <RouterLink to={link}>
                <Paper className={classes.paper}>
                    <Typography variant="h5" component="h3">
                        {mydoc.title}
                    </Typography>
                    <Typography variant="subtitle2">
                        {mydoc.updatedAt ? mydoc.updatedAt : mydoc.createdAt}
                    </Typography>
                </Paper>
            </RouterLink>
        </Grid>
    );
}

export default withStyles(styles)(MdocList);