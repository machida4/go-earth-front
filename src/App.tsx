import React, { useEffect, useState } from "react";
import EmojiPicker, {
  EmojiStyle,
  EmojiClickData,
  Emoji,
} from "emoji-picker-react";
import "./App.css";

type Post = {
  emoji: string;
  content: string;
};

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const handleSubmit = (formText: Post) => {
    if (posts.length >= 10) {
      setPosts([...posts.slice(1), formText]);
    } else {
      setPosts([...posts, formText]);
    }
  };

  const postBlocks = posts.map((post) => {
    return <PostBlock post={post} />;
  });

  return (
    <div>
      <div>{postBlocks}</div>
      <ChatForm onSubmit={handleSubmit} />
    </div>
  );
};

const PostBlock: React.FC<{ post: Post }> = (props: { post: Post }) => {
  return (
    <div>
      <Emoji
        unified={props.post.emoji}
        emojiStyle={EmojiStyle.TWITTER}
        size={22}
      />
      {props.post.content}
    </div>
  );
};

const EmojiSelectBox = (props: { onSetSelectedEmoji: (emoji: string) => void}) => {
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");
  const [shouldShowEmojiPicker, setShouldShowEmojiPicker] = useState<any>(true);

  const onEmojiClick = (emojiClickData: EmojiClickData, event: MouseEvent) => {
    setSelectedEmoji(emojiClickData.unified);
    props.onSetSelectedEmoji(emojiClickData.unified);
  };

  const handleClick = () => {
    setShouldShowEmojiPicker(!shouldShowEmojiPicker);
  };

  return (
    <div>
      {selectedEmoji ? (
        <div>
          <Emoji
            unified={selectedEmoji}
            emojiStyle={EmojiStyle.TWITTER}
            size={22}
          />
        </div>
      ) : null}
      {shouldShowEmojiPicker ? (
        <EmojiPicker
          onEmojiClick={onEmojiClick}
          emojiStyle={EmojiStyle.TWITTER}
          skinTonesDisabled={true}
        />
      ) : null}
    </div>
  );
};

const ChatForm = (props: { onSubmit: (post: Post) => void }) => {
  const [emoji, setEmoji] = useState("");
  const [formText, setFormText] = useState("");

  const handleEmojiChange = (emoji: string) => {
    setEmoji(emoji);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const post = { emoji: emoji, content: formText };
    props.onSubmit(post);
    setFormText("");
  };

  return (
    <div>
      <EmojiSelectBox onSetSelectedEmoji={handleEmojiChange}/>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={formText}
            onChange={(event) => handleTextChange(event)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default App;
