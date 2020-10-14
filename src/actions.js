export const addContact = (contact) => {
  return {
    type: "ADD_CONTACT",
    payload: contact,
  };
};

export const readContact = () => {
  return {
    type: "READ_CONTACT",
  };
};

export const readContactByEmail = (email) => {
  return {
    type: "READ_BY_EMAIL",
    payload: email,
  };
};

export const updateContact = (email, contact) => {
  return {
    type: "UPDATE_CONTACT",
    payload: { email, contact },
  };
};

export const deleteContact = (email) => {
  return {
    type: "DELETE_CONTACT",
    payload: email,
  };
};
