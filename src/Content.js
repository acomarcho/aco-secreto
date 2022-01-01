import { useRef, useContext } from "react";
import AppContext from "./AppContext";

/*
  <div className="flex flex-col gap-4">
    <div className="bg-gray px-8 py-4 rounded-full">
      <p className="text-sm text-white">Sat, 01 Jan 2022 11:14:36 GMT</p>
      <p className="text-md text-white">Test comment 1</p>
    </div>
  </div> 
*/

const Content = ({id, date, msg}) => {
  const commentRef = useRef();
  const { comments, setRefresh } = useContext(AppContext);

  const commentsArray = comments[id];

  const handleComment = (e) => {
    e.preventDefault();
    if (commentRef.current.value) {
      const currDate = new Date();
      const data = {
        id: id,
        date: currDate.toUTCString(),
        msg: commentRef.current.value
      }
      fetch(
        "https://secreto-clone-default-rtdb.asia-southeast1.firebasedatabase.app/comments.json",
        {
          method: 'POST',
          body: JSON.stringify(data)
        }
      );
      alert('Comment posted!');
      setRefresh(oldRefresh => oldRefresh + 1)
    }
  }

  return (
    <div
      className="p-8 bg-white shadow-md rounded-lg flex flex-col gap-4"
    >
      <p className="font-heebo text-gray">{date}</p>
      <p className="font-heebo text-black">{msg}</p>
      <div>
        <form
          className="flex justify-between gap-4 p-2 px-8 border-black border-solid border-2 rounded-full"
          onSubmit={handleComment}
        >
          <input
            type="text"
            placeholder="Insert a comment"
            className="focus:outline-none w-[100%]"
            ref={commentRef}
          />
          <button
            type="submit"
            className="text-red font-bold transition-all hover:opacity-75"
          >
            Send
          </button>
        </form>
      </div>
      { commentsArray && commentsArray.map((msg, idx) => {
          return <div className="flex flex-col gap-4" key={idx}>
            <div className="bg-gray px-8 py-2 rounded-full">
              <p className="text-sm text-white">
                {msg.date}
              </p>
              <p className="text-md text-white">{msg.msg}</p>
            </div>
          </div>; 
      }) }
    </div>
  );
};

export default Content;
