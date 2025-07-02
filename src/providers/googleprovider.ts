import { GoogleAuthProvider } from "firebase/auth";

const googleprovider = new GoogleAuthProvider();

googleprovider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export default googleprovider;