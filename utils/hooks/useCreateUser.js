import { db } from "../auth/firebase";
import { useMutation } from "react-query";

export default function useCreateUser() {
  return useMutation((value) => {
    const docRef = db.collection("users").doc(value.id);
    docRef.get().then((doc) => {
      if (!doc.exists) {
        docRef.set(value);
      } else {
        docRef.update(value);
      }
    });
  });
}
