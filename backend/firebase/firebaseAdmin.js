import admin from "firebase-admin";
import { readFileSync } from "fs";

admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(readFileSync("./firebase-key.json"))
  ),
});

export default admin;
