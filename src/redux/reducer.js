export default function reducer(state = { users: [] }, action) {
  let newState = { ...state };
  switch (action.type) {
    case "FETCH_USERS":
      newState.users = action.payload;
      return newState;

    case "ADD_USERS":
      newState.users.push({
        name: { fname: action.payload.fname, lname: action.payload.lname },

        contact: action.payload.contact,
        imageUrl: action.payload.imageUrl,
      });

      return newState;
    case "EDIT_USERS":
      newState.users.forEach((user) => {
        if (user.contact === action.payload.prevNo) {
          user.name.fname = action.payload.fname;
          user.name.lname = action.payload.lname;
          user.contact = action.payload.contact;
          user.imageUrl = action.payload.imgurl;
        }
      });

      return newState;
    case "DELETE_USERS":
      for (var i = 0; i < newState.users.length; i++) {
        if (newState.users[i].contact === parseInt(action.payload.contact)) {
          newState.users.splice(i, 1);
        }
      }
      return newState;
    default:
      return state;
  }
}
