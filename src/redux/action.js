export function fetchUsers(user) {
  console.log(user);
  return {
    type: "FETCH_USERS",
    payload: user,
  };
}

export function addUsers(user) {
  return {
    type: "ADD_USERS",
    payload: user,
  };
}

export function editUsers(user) {
  return {
    type: "EDIT_USERS",
    payload: user,
  };
}

export function deleteUsers(user) {
  return {
    type: "DELETE_USERS",
    payload: user,
  };
}
