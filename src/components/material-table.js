import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { readContact, deleteContact, readContactByEmail } from "../actions";
import { useDispatch, connect } from "react-redux";
import { useHistory } from "react-router-dom";

const Materialtable = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(readContact());
  }, []);

  const columns = [
    { title: "Name", field: "name" },
    {
      title: "Email",
      field: "email",
    },
    { title: "Date Created", field: "doc" },
    {
      title: "Date Modified",
      field: "dom",
    },
  ];
  console.log("aa", props.contact);
  const data = props.contact.map((data) => {
    return {
      name: data.name,
      email: data.email,
      doc: data.doc,
      dom: data.dom,
    };
  });

  return (
    <MaterialTable
      title="Editable Preview"
      columns={columns}
      data={data}
      actions={[
        {
          icon: "edit",
          tooltip: "Edit",
          onClick: async (event, rowData) => {
            dispatch(readContactByEmail(rowData.email));
            history.push("/EditContact");
          },
        },
      ]}
      editable={{
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              dispatch(deleteContact(oldData.email));

              resolve();
            }, 1000);
          }),
      }}
    />
  );
};
const mapStateToProps = (state) => {
  return {
    contact: state.contact,
  };
};

export default connect(mapStateToProps)(Materialtable);
