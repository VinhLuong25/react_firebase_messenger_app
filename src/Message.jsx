import React, { forwardRef, useEffect, useRef, useState } from "react";
import moment from "moment";
const Message = forwardRef(({ message, user }, ref) => {
  const isUser = message.user === user;
  const images = message.file;
  const day =
    message.timestamp &&
    moment.unix(message.timestamp.seconds).calendar(null, {
      sameDay: "[Today]",
      nextDay: "[Tomorrow]",
      nextWeek: "dddd",
      lastDay: "[Yesterday]",
      lastWeek: "[Last] dddd",
      sameElse: "DD/MM/YYYY",
    });
  const time =
    message.timestamp &&
    moment.unix(message.timestamp.seconds).format("H:mm:ss");
  console.log(day);
  //scroll to bottom
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const a = setTimeout(() => scrollToBottom(), 600);
    return () => {
      clearTimeout(a);
    };
  }, []);

  return (
    <div ref={ref} className={`${isUser ? "message right" : "message left "}`}>
      {isUser ? (
        <div className="message__detail ">
          <span className="message__time">
            {day}, {time}
          </span>
          &nbsp; &nbsp;
          <span className="user__name">{message.user}</span>&nbsp;&nbsp;
          <i className="fa fa-circle icon-right "></i>
        </div>
      ) : (
        <div className="message__detail">
          <i className="fa fa-circle icon-left "></i>
          &nbsp;&nbsp;
          <span className="user__name">{message.user}</span>
          &nbsp; &nbsp;
          <span className="message__time">
            {day}, {time}
          </span>
        </div>
      )}

      <div className={`${isUser ? "my_message" : "other_message "}`}>
        {message.message && message.message}
        {images.length > 0 && (
          <div className="grid">
            {images.map(({ id, url }) => {
              return (
                <div className="col" key={id}>
                  <img src={url} alt="" style={{ maxWidth: "100%" }}></img>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <br />
      <div ref={messagesEndRef} />
    </div>
  );
});
export default Message;
