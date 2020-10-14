export const Reducer = (
  state = {
    contact: [],
    oneContact: [],
  },
  action
) => {
  switch (action.type) {
    case "ADD_CONTACT":
      alert("Added");
      return { contact: [...state.contact, action.payload] };
    case "READ_CONTACT":
      return { contact: state.contact };
    case "READ_BY_EMAIL":
      return {
        contact: state.contact,
        oneContact: state.contact.filter((con) => {
          if (action.payload === con.email) return con;
        }),
      };
    case "UPDATE_CONTACT":
      const conList = [...state.contact];
      console.log("list", state.contact);
      const indexToUpdate = conList.findIndex(
        (con) => con.email === action.payload.email
      );
      state.contact[indexToUpdate] = action.payload.contact;
      return {
        contact: [...state.contact],
      };
    case "DELETE_CONTACT":
      const list = [...state.contact];
      const indexToDelete = list.findIndex(
        (con) => con.email === action.payload
      );
      return {
        contact: [
          ...list.slice(0, indexToDelete),
          ...list.slice(indexToDelete + 1),
        ],
      };
    default:
      return state;
  }
};
