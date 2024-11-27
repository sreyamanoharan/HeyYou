import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import { getSender, getSenderFull } from "../config/ChatLogics";
import ProfileModal from "./ProfileModal";
import axios from "../axios";
import ScrollableChats from "./ScrollableChats";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:3000"; // Backend server endpoint
let socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typingUser, setTypingUser] = useState(null); // Track who is typing
  const [isTyping, setIsTyping] = useState(false);

  const { user, selectedChat } = ChatState();

  const fetchChats = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);
      const { data } = await axios.get(`/message/new-message/${selectedChat._id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", (data) => {
      setIsTyping(true);
      setTypingUser(data.sender); // Set the sender's details
    });
    socket.on("stop typing", () => {
      setIsTyping(false);
      setTypingUser(null); // Clear the sender's details
    });
  }, []);

  useEffect(() => {
    fetchChats();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
        // Notification for a different chat
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      socket.emit("stop typing", { room: selectedChat._id, sender: user._id });
      try {
        setNewMessage("");
        const { data } = await axios.post(
          "/message/new-message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  
    if (!socketConnected) return; // Ensure the socket connection is active
  
    socket.emit("typing", { room: selectedChat._id, sender: user }); // Include sender details
    
    let lastTypingTime = new Date().getTime();
    const timerLength = 3000; // Stop typing after 3 seconds of inactivity
    
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
  
      if (timeDiff >= timerLength) {
        socket.emit("stop typing", { room: selectedChat._id, sender: user._id });
      }
    }, timerLength);
  };
  

  return (
    <>
      {selectedChat ? (
        <>
          <div>
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchChats={fetchChats}
                />
              </>
            )}
          </div>

          <div>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div>
                <ScrollableChats messages={messages} />
              </div>
            )}

            <form
              onSubmit={(e) => e.preventDefault()} // Prevent form submission
              onKeyDown={sendMessage} // Handle "Enter" key press
            >
              {isTyping && typingUser ? (
                <div>
                  <p>
                    {typingUser.Name || getSender(user, [typingUser])} is typing...
                  </p>
                </div>
              ) : null}
              <input
                placeholder="Enter a new message"
                onChange={typingHandler}
                value={newMessage}
              />
            </form>
          </div>
        </>
      ) : (
        <p>Click on a user to start chatting</p>
      )}
    </>
  );
};

export default SingleChat;
