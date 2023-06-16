import "./css/ChatBox.css";
import GPTicon from "../../assets/chatGPT3.5.jpg";
import AppLogo from "../../assets/AppLogo.png";
import { BsSend } from "react-icons/bs";
import { AiOutlineStop } from "react-icons/ai";
import { api_key as API_KEY } from "../../config";

import { FormEvent, useState, useRef, useEffect } from "react";

interface chat {
  question: string;
  answer: string;
  createdAt: string;
}

interface chat2 {
  role: string;
  content: string;
  createdAt: string;
  fake: boolean;
}
function ChatBox() {
  const [input, setInput] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [onType, setOnType] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [dots, setDots] = useState(".");

  const current = new Date();
  const fakeChatLog = [
    {
      role: "user",
      content: "I want to use ChatGPT today",
      createdAt: "",
      fake: true,
    },
    {
      role: "assistant",
      content: "How can I help you today?",
      createdAt: "",
      fake: true,
    },
  ];
  const [chatLog, setChatLog] = useState<chat2[]>([]);

  const [chatLog5mins, setChatLog5mins] = useState<chat2[]>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots === "...") {
          return ".";
        } else {
          return prevDots + ".";
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  async function processMessageToChatGPT(input: string) {
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: chatLog5mins
        ? [
            ...chatLog5mins.map(({ role, content }) => ({ role, content })),
            { role: "user", content: input },
          ]
        : [{ role: "user", content: input }],
      stream: true,
    };

    if (input != "") {
      setChatLog([
        ...chatLog,
        {
          role: "user",
          content: input,
          createdAt: current.getTime().toString(),
          fake: false,
        },
      ]);
      setInput("");
      setOnType(true);
    }
    setLoading(true);
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    });

    if (response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let textingContent = "";

      setChatLog((prevChatLog) => [
        ...prevChatLog,
        {
          role: "assistant",
          content: "",
          createdAt: "",
          fake: false,
        },
      ]);

      setLoading(false);
      while (true) {
        const chunk = await reader.read();
        const { done, value } = chunk;
        if (done) {
          break;
        }
        const decodedChunk = decoder.decode(value);
        const lines = decodedChunk.split("\n");
        const parsedLines = lines
          .map((line) => line.replace(/^data: /, "").trim())
          .filter((line) => line !== "" && line !== "[DONE]")
          .map((line) => JSON.parse(line));

        for (const parsedLine of parsedLines) {
          const { choices } = parsedLine;
          const { delta } = choices[0];
          const { content } = delta;
          if (content) {
            textingContent += content;
            setChatLog((prevChatLog) => {
              const lastItemIndex = prevChatLog.length - 1;
              const lastItem = prevChatLog[lastItemIndex];

              const modifiedLastItem = {
                ...lastItem,
                content: lastItem.content + content,
              };
              const newChatLog = [
                ...prevChatLog.slice(0, lastItemIndex),
                modifiedLastItem,
              ];
              return newChatLog;
            });
          }
        }
      }

      textingContent.replace(/\n/g, "<br>");
      setOnType(false);

      if (input != "" && textingContent != "") {
        fetch(`http://localhost:8080/chats/me`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
          body: JSON.stringify({
            question: input,
            answer: textingContent,
          }),
        });
      }
    }
  }

  const handleSubmit = async (e: FormEvent, input: string) => {
    e.preventDefault();
    if (onType == false) {
      await processMessageToChatGPT(input);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:8080/chats/me?order=ASC`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data.flatMap((chat: chat) => [
          {
            content: chat.question,
            role: "user",
            createdAt: new Date(chat.createdAt).getTime().toString(),
          },
          { content: chat.answer, role: "assistant", createAt: "" },
        ]);
        setChatLog([...chatLog, ...formattedData]);
      });
  }, []);

  //---
  useEffect(() => {
    const currentTime = current.getTime();
    const fiveMinutesAgo = currentTime - 5 * 60 * 1000;
    const filteredChatLog = chatLog.filter((item) => {
      return parseInt(item.createdAt) >= fiveMinutesAgo || item.createdAt == "";
    });
    setChatLog5mins(filteredChatLog);
  }, [chatLog]);

  useEffect(() => {}, [chatLog5mins]);

  useEffect(() => {
    fetch(`http://localhost:8080/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setImageUrl(data.imageUrl);
      });
  }, []);

  const handleClick = async (input: string) => {
    if (onType == false) {
      await processMessageToChatGPT(input);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [chatLog]);

  return (
    <>
      <div
        style={{
          backgroundColor: "#0a0e29",
          height: "55px",
          display: "flex",
          width: "100%",
        }}
      ></div>
      <div className="chat-log">
        {fakeChatLog.map((message, index) => (
          <ChatMessage key={index} message={message} imageUrl={imageUrl} />
        ))}
        <div ref={messagesEndRef} />
        {chatLog.map((message, index) => (
          <ChatMessage key={index} message={message} imageUrl={imageUrl} />
        ))}
        <div className={`lastChat`} style={{ display: loading ? "" : "none" }}>
          <div className="chat-message-center">
            <div className={`avatar`}>
              <img src={GPTicon} alt="" className="avatar" />
            </div>
            <div className="message">{dots}</div>
          </div>
        </div>
        <div ref={messagesEndRef} />
      </div>

      <div
        style={{
          position: "fixed",
          backgroundColor: "#282c34",
          width: "100%",
          height: "8%",
          bottom: "4%",
        }}
      >
        <div className="chat-input-holder">
          <form onSubmit={(e) => handleSubmit(e, input)}>
            <input
              value={input}
              onChange={(e) => setInput(e.currentTarget.value)}
              className="chat-input-textarea"
              placeholder="Type your message here"
            ></input>
          </form>
          <BsSend
            style={{
              position: "absolute",
              bottom: "30%",
              right: "-8%",
              fontSize: "150%",
              color: "white",
            }}
            onClick={() => handleClick(input)}
          />
        </div>
      </div>
    </>
  );
}

interface ChatMessageProps {
  message: message;
  imageUrl: string;
}

interface message {
  content: string;
  role: string;
  fake: boolean;
  createdAt: string;
}

const ChatMessage = ({ message, imageUrl }: ChatMessageProps) => {
  const content = message.content.replace(/\n/g, "<br>");
  return (
    <div
      className={`chat-message ${message.role === "assistant" && "chatgpt"}`}
    >
      <div className="chat-message-center">
        <div className={`avatar ${message.role === "assistant" && "chatgpt"}`}>
          {message.role === "assistant" && (
            <img src={GPTicon} alt="" className="avatar" />
          )}
          {message.role === "user" && (
            <img
              src={imageUrl == undefined ? AppLogo : imageUrl}
              alt=""
              className="avatar2"
            />
          )}
        </div>
        <div className="message" dangerouslySetInnerHTML={{ __html: content }}>
          {}
        </div>

        <div className="currentTime">
          {message.role === "user" && !message.fake
            ? new Date(parseInt(message.createdAt)).toLocaleString()
            : ""}
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
