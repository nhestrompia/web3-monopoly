"use client";

import PartySocket from "partysocket";
import React, { useEffect, useRef, useState } from "react";

interface IMessage {
  sender: string;
  content: string;
}

interface ISocketConnection {}

const SocketConnection: React.FC<ISocketConnection> = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [username, setUsername] = useState<string>(
    "User-" + Math.floor(Math.random() * 1000)
  );

  // Use a ref to persist the WebSocket connection across renders
  const connRef = useRef<PartySocket | null>(null);

  useEffect(() => {
    // Only establish the PartySocket connection once
    if (!connRef.current) {
      connRef.current = new PartySocket({
        host: "http://127.0.0.1:1999", // Replace with your PartyKit/WebSocket server URL
        room: "dice-room",
      });

      const conn = connRef.current;
      console.log("🚀 ~ useEffect ~ conn:", conn);

      // Event listener for incoming messages
      const handleMessage = (event: MessageEvent) => {
        console.log("messageevent", event.data);

        const message = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, message]);
      };

      // Event listener for connection opening
      const handleOpen = () => {
        console.log("connected");

        setIsConnected(true);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "System",
            content: "Connected! You can now send messages.",
          },
        ]);
      };

      // Add event listeners
      conn.addEventListener("message", handleMessage);
      conn.addEventListener("open", handleOpen);

      // return () => {
      //   console.log("Cleaning up WebSocket connection...");
      //   conn.removeEventListener("message", handleMessage);
      //   conn.removeEventListener("open", handleOpen);
      //   conn.close();
      // };
    }
  }, []);

  // Function to send a message (e.g., dice roll or text)
  const sendMessage = (message: string) => {
    if (connRef.current) {
      const data = { sender: username, content: message };
      connRef.current.send(JSON.stringify(data));
      setMessages((prevMessages) => [...prevMessages, data]); // Add it locally as well
    }
  };

  // Dice rolling function
  const rollDice = () => {
    const diceResult = Math.floor(Math.random() * 6) + 1;
    sendMessage(`rolled a dice and got a ${diceResult}`);
  };

  // Handling message input and sending
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() !== "") {
      sendMessage(input);
      setInput(""); // Clear input field after sending
    }
  };

  return (
    <div>
      <h1>Real-time Messaging with Dice Rolls</h1>
      {isConnected ? <p>Status: Connected</p> : <p>Status: Connecting...</p>}

      <div>
        <h3>Messages:</h3>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}: </strong>
            {msg.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Send Message</button>
      </form>

      <button onClick={rollDice}>Roll Dice</button>
    </div>
  );
};

export default SocketConnection;
