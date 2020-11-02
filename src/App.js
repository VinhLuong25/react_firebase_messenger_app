import React, { useState, useEffect } from "react";
import "./styles.scss";
import Button from "@material-ui/core/Button";
import { db } from "./firebase/config";
import Firestore from "firebase";
import Message from "./Message";
import FlipMove from "react-flip-move";
import { v4 as uuid } from "uuid";
import { firebase } from "./firebase/config";
import ClipLoader from "react-spinners/ClipLoader";

export default function App() {
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState();
  const [username, setUsername] = useState("");
  const [img, setImg] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    db.collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMsg(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    setUsername(prompt("Please enter your name:"));
    const a = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(a);
  }, []);

  const readImage = async (e) => {
    const file = e.target.files[0];
    if (file.length < 0) return;
    const id = uuid();
    const storageRef = firebase.storage().ref("images").child(id);
    console.log(storageRef);
    const imageRef = firebase.database().ref("images").child("child").child(id);

    await storageRef.put(file);
    console.log("success storage");
    storageRef
      .getDownloadURL()
      .then((url) => {
        imageRef.set(url);
        const newImg = [...img, { id, url }];
        setImg(newImg);
        console.log("success db");
      })
      .catch((err) => console.log(err));
  };

  const removeImg = async (id) => {
    const storageRef = firebase.storage().ref("images").child(id);
    const imageRef = firebase.database().ref("images").child("child").child(id);
    await storageRef
      .delete()
      .then(() => {
        imageRef.remove();
        console.log("success remove");
        const filterImg = img.filter((im) => im.id !== id);
        setImg(filterImg);
      })
      .catch((err) => console.log(err));
  };

  const handleSend = (e) => {
    e.preventDefault();

    if (input || img.length > 0) {
      db.collection("messages").add({
        message: input,
        user: username,
        file: img,
        timestamp: Firestore.firestore.FieldValue.serverTimestamp(),
      });
      setInput("");
      setImg([]);
    } else {
      return;
    }
  };
  console.log(msg);
  return (
    <div className="chat">
      <div className="loading">
        <ClipLoader size={100} loading={loading} />
      </div>
      {username && !loading ? (
        <div className="chat__content">
          <div className="chat__content__top"></div>
          <div className="chat__content__box">
            <FlipMove>
              {msg &&
                msg.map((m) => (
                  <Message key={m.id} message={m.message} user={username} />
                ))}
            </FlipMove>
          </div>

          <form className="chat__content__message" onSubmit={handleSend}>
            {img.length > 0 ? (
              <div className="image">
                {img.map(({ id, url }) => {
                  return (
                    <div className="image__box" key={id}>
                      <img src={url} alt="" className="image__box__img"></img>
                      <div
                        onClick={() => removeImg(id)}
                        className="image__box__remove"
                      >
                        X
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}

            <textarea
              className="input-text"
              placeholder="Type your message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="chat__content__message__right">
              <div className="file-icon">
                <i className="fa fa-image pic-icon "></i>
                <input
                  type="file"
                  name="file"
                  className="custom-file-input"
                  accept="image/png, image/jpeg"
                  onChange={readImage}
                />
              </div>

              <Button
                type="submit"
                className="send-btn"
                variant="contained"
                color="primary"
                size="large"
              >
                Send &nbsp; <i className="fa fa-paper-plane"></i>
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
