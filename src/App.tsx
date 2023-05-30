import { useEffect, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import "./App.css";

const App = () => {
  const handleSubmit = (formText: string) => {
    alert(formText);
  };

  return (
    <div>
      <ChatForm onSubmit={handleSubmit} />
    </div>
  );
};

const ChatForm = (props: { onSubmit: (formText: string) => void }) => {
  const [formText, setFormText] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    props.onSubmit(formText);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          name="text"
          onChange={(event) => handleChange(event)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default App;
