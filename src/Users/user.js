import firebase from "firebase";

export async function getUser() {
  const docref = await firebase.firestore().collection("Users").get();
  const docs = docref.docs.map((doc) => doc.data());
  return docs;
}

export async function addUser(user) {
  console.log(user);
  const docref = await firebase.firestore().collection("Users").doc();
  await docref.set({
    name: {
      fname: user.user.fname,
      lname: user.user.lname,
    },
    contact: parseInt(user.user.contact),
    imageUrl: user.imageUrl,
  });
}

export async function editUser(user) {
  const queryRef = await firebase
    .firestore()
    .collection("Users")
    .where("contact", "==", parseInt(user.user.prevNo));
  const snapshot = await queryRef.get();
  snapshot.docs.map((doc) =>
    doc.ref.set({
      name: {
        fname: user.user.fname,
        lname: user.user.lname,
      },
      contact: parseInt(user.user.contact),
      imageUrl: user.imgurl,
    })
  );
}

export async function deleteUser(user) {
  const snapshot = await firebase
    .firestore()
    .collection("Users")
    .where("contact", "==", user.contact)
    .get();
  snapshot.docs.map(async (doc) => await doc.ref.delete());
}
