import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import FormCard from "./formCard";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";
import { addContact, updateContact } from "../actions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
}));
const convertDate = (d) => {
  var date = d.getDate();
  var month = d.getMonth() + 1;
  var year = d.getFullYear();

  return date + "/" + month + "/" + year;
};
const Form = (props) => {
  const history = useHistory();

  const classes = useStyles();
  const dispatch = useDispatch();
  let buttonText = "Add Data";
  let initialValues = undefined;
  if (props.location.pathname === "/EditContact") {
    buttonText = "Update Data";
    initialValues = {
      name: props.oneContact[0].name,
      email: props.oneContact[0].email,
    };
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (props.location.pathname === "/EditContact") {
      const contact = {
        name: e.target.name.value,
        email: e.target.email.value,
        dom: convertDate(new Date()),
        doc: props.oneContact[0].doc,
      };

      dispatch(updateContact(props.oneContact[0].email, contact));
      history.push("/ManageContact");
    } else {
      const contact = {
        name: e.target.name.value,
        email: e.target.email.value,
        doc: convertDate(new Date()),
        dom: "Not modified yet",
      };

      dispatch(addContact(contact));
    }

    e.target.name.value = "";
    e.target.email.value = "";
  }
  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} justify="center">
          <Grid item xs={12} container justify="center">
            <Typography variant="h5" gutterBottom>
              Add Contact
            </Typography>
          </Grid>
          <Grid item xs={10} md={6}>
            <FormCard title="Contact Details">
              <TextField
                name="name"
                label="Enter name"
                type="string"
                defaultValue={initialValues ? initialValues.name : ""}
                fullWidth={true}
                required={true}
                size="small"
                margin="normal"
                variant="outlined"
              />
              <TextField
                name="email"
                label="Enter email"
                type="email"
                defaultValue={initialValues ? initialValues.email : ""}
                fullWidth={true}
                required={true}
                size="small"
                margin="normal"
                variant="outlined"
              />
            </FormCard>
          </Grid>
        </Grid>
        <Grid container item xs={12} justify="center">
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "30px" }}
            size="large"
            type="submit"
          >
            {buttonText}
          </Button>
        </Grid>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    contact: state.contact,
    oneContact: state.oneContact,
  };
};
export default connect(mapStateToProps)(Form);
