import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal } from "@mui/material";
// import Modal from '@mui/material/modal';
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

  const handleSubmit = useCallback(
    (formText: Post) => {
      if (posts.length >= 10) {
        setPosts([...posts.slice(1), formText]);
      } else {
        setPosts([...posts, formText]);
      }
    },
    [posts]
  );

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

const PostBlock = React.memo((props: { post: Post }) => {
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
});

const ChatForm = (props: { onSubmit: (post: Post) => void }) => {
  const [emoji, setEmoji] = useState("");
  const [formText, setFormText] = useState("");
  const [openModal, setOpenModal] =
    useState<boolean>(true);

  const handleEmojiClick = (open: boolean) => {
    setOpenModal(open);
  };

  const handleEmojiChange = useCallback((emoji: string) => {
    setEmoji(emoji);
  }, []);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const post = { emoji: emoji, content: formText };
    props.onSubmit(post);
    setFormText("");
  };

  const SelectedEmojiPreview = (
    <div>
      {emoji !== "" ? (
        <div>
          <Button variant="outlined" onClick={() => setOpenModal(true)}>
            <Emoji unified={emoji} emojiStyle={EmojiStyle.TWITTER} size={22} />
          </Button>
        </div>
      ) : null}
    </div>
  );

  const Form = (
    <div className="chat-form-element">
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

  return (
    <div>
        <EmojiSelectModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSetSelectedEmoji={handleEmojiChange}
          onEmojiClick={handleEmojiClick}
        />
      {SelectedEmojiPreview}
      {Form}
    </div>
  );
};

const EmojiSelectModal = React.memo(
  (props: {
    open: boolean;
    onClose: () => void;
    onSetSelectedEmoji: (emoji: string) => void;
    onEmojiClick: (open: boolean) => void;
  }) => {

    const onEmojiClick = useCallback(
      (emojiClickData: EmojiClickData, _: MouseEvent) => {
        props.onSetSelectedEmoji(emojiClickData.unified);
        props.onEmojiClick(false);
      },
      []
    );

    const handleClose = () => props.onClose();

    return (
      <div>
        <Modal
          open={props.open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        >
          <EmojiPicker
            onEmojiClick={onEmojiClick}
            emojiStyle={EmojiStyle.TWITTER}
            skinTonesDisabled={true}
          />
        </Modal>
      </div>
    );
  }
);

export default App;
