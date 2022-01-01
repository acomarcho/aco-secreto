import { useRef, useContext } from "react";
import AppContext from './AppContext'

const Form = () => {
  const {setRefresh} = useContext(AppContext);
  const formRef = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (formRef.current.value) {
      const currDate = new Date();
      const msgData = {
        date: currDate.toUTCString(),
        msg: formRef.current.value
      };
      fetch(
        "https://secreto-clone-default-rtdb.asia-southeast1.firebasedatabase.app/messages.json",
        {
          method: 'POST',
          body: JSON.stringify(msgData),
          header: {
            'Content-Type': 'application/json'
          }
        }
      ).then(() => {
        alert('Message sent!');
        formRef.current.value = '';
        setRefresh(oldRefresh => oldRefresh + 1);
      });
    } else {
      alert('Please enter a message!')
    }
  }
  return (
    <div className="p-8 bg-white shadow-md rounded-lg">
      <div className="flex flex-col gap-4">
        <h1 className="font-heebo text-2xl font-bold text-center text-black">
          Send a secret message to me!
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <textarea
            name="text-form"
            id="text-form"
            placeholder="Write your secret message here"
            className="border-2 border-solid border-black p-4 rounded-xl h-[150px]"
            ref={formRef}
          ></textarea>
          <button type="submit" className="bg-red text-white py-2 rounded-xl transition-all hover:opacity-75">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Form;
