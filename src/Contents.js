import { useEffect, useContext } from "react";
import AppContext from "./AppContext"
import Content from './Content'

const Contents = () => {
  const {isLoading, setIsLoading, messages, setMessages, setComments, refresh} = useContext(AppContext);

  useEffect(() => {
    setIsLoading(true);
    /* Fetch messages */
    fetch(
      "https://secreto-clone-default-rtdb.asia-southeast1.firebasedatabase.app/messages.json"
    ).then(response => response.json()).then(data => {
      const tmpData = [];
      for (let key in data) {
        tmpData.unshift({
          id: key,
          date: data[key].date,
          msg: data[key].msg
        });
      }
      setMessages(tmpData);
      /* Fetch comments */
      fetch(
        "https://secreto-clone-default-rtdb.asia-southeast1.firebasedatabase.app/comments.json"
      ).then(response => response.json()).then(data => {
        const tmpData = {};
        for (let key in data) {
          const id = data[key].id;
          const date = data[key].date;
          const msg = data[key].msg;
          if (tmpData[id]) {
            tmpData[id].unshift({
              date: date,
              msg: msg
            });
          } else {
            tmpData[id] = [{date: date, msg: msg}];
          }
        }
        setComments(tmpData);
        setIsLoading(false);
      });
    });
  }, [setMessages, setIsLoading, setComments, refresh]);
  
  if (isLoading) {
    return (
      <div className="p-8 bg-white shadow-md rounded-lg flex flex-col gap-4">
        <p className="text-center text-black">
          Loading...
        </p>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="p-8 bg-white shadow-md rounded-lg flex flex-col gap-4">
        <p className="text-center text-black">
          I currently don't have any secret messages to display! Please send
          one for me.
        </p>
      </div>
    );
  }
  
  return <div className="flex flex-col gap-8">
    {messages.map((msg) => {
      return <Content key={msg.id} id={msg.id} date={msg.date} msg={msg.msg} />
    })}
  </div>
};

export default Contents;
