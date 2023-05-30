import React, { useEffect, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import "./App.css";

const App = () => {
  const [posts, setPosts] = useState<string[]>([]);

  const handleSubmit = (formText: string) => {
    if (posts.length >= 10) {
      setPosts([...posts.slice(1), formText]);
    } else {
      setPosts([...posts, formText]);
    }
  };

  const postBlocks = posts.map((post) => {
    return <PostBlock content={post} />;
  });

  return (
    <div>
      <div>{postBlocks}</div>
      <ChatForm onSubmit={handleSubmit} />
    </div>
  );
};

const PostBlock: React.FC<{ content: string }> = (props: {
  content: string;
}) => {
  return <div>{props.content}</div>;
};

const ChatForm = (props: { onSubmit: (formText: string) => void }) => {
  const [formText, setFormText] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit(formText);
    setFormText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          value={formText}
          onChange={(event) => handleChange(event)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default App;
