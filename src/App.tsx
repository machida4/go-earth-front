import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchImage().then((newImage) => {
      setImageUrl(newImage.url); // 画像urlの状態を更新
      setLoading(false); // ローディング状態を更新
    });
  }, []);
  const handleClick = async () => {
    setLoading(true);
    const newImage = await fetchImage();
    setImageUrl(newImage.url);
    setLoading(false);
  };
  return (
    <div>
      <button onClick={handleClick}>他の猫ボタン</button>
      <div>{loading || <img src={imageUrl} width="300" height="300" />}</div>
    </div>
  );
};

type Image = {
  url: string;
};

const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images: unknown = await res.json();
  if (!Array.isArray(images)) {
    throw new Error("画像を取得できませんでした");
  }
  const image: unknown = images[0];
  if (!isImage(image)) {
  }
  return images[0];
};

const isImage = (value: unknown): value is Image => {
  if (!value || typeof value !== "object") {
    return false;
  }
  return "url" in value && typeof value.url == "string";
};

export default App;
