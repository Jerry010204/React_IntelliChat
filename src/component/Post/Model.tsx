import { CSSProperties } from "react";

interface ModelProps {
  open: boolean;
  onClose: () => void;
  onClickContent: Post;
}

interface Post {
  question: string | undefined;
  answer: string | undefined;
  chat_id: number | undefined;
}

const MODEL_STYLES: CSSProperties = {
  position: "fixed",
  top: "34%",
  bottom: "49%",
  left: "12%",
  right: "12%",
  backgroundColor: "antiquewhite",
  zIndex: 1000,
};

const OVERLAY_STYLES: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};
export default function Model(props: ModelProps) {
  const { open, onClose, onClickContent } = props;
  if (!open) return null;

  const Post = async (
    question: string | undefined,
    answer: string | undefined
  ) => {
    const response = await fetch("http://localhost:8080/posts/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify({ chatId: onClickContent.chat_id }),
    });
  };

  return (
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODEL_STYLES}>
        <div
          style={{
            marginTop: "10px",
            fontWeight: 600,
            fontSize: "19px",
            textAlign: "center",
          }}
        >
          確定要發佈此內容嗎？
        </div>
        <div
          style={{
            padding: "10px",
            whiteSpace: "nowrap",
            textAlign: "center",
            overflow: "hidden",
            fontWeight: 500,
            textOverflow: "ellipsis",
          }}
        >
          {onClickContent.question}
        </div>
        <button
          onClick={() => {
            onClose();
            Post(onClickContent.question, onClickContent.answer);
          }}
          style={{
            position: "absolute",
            display: "inline",
            top: "60%",
            left: "20%",
            width: "20%",
            height: "20%",
          }}
        >
          確認
        </button>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            display: "inline",
            top: "60%",
            right: "20%",
            width: "20%",
            height: "20%",
          }}
        >
          取消
        </button>
      </div>
    </>
  );
}
