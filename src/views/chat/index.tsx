import React, { useEffect, useState } from "react"
import {
  sendMessage,
  listenForMessages,
  getUnreadMessagesCount,
} from "../../api/firebase"
import { getDatabase, ref, get, set, onValue } from "firebase/database"
import { useAuth } from "../../AuthContext"
import { db } from "../../api/firebase"
import "./index.css"

const Chat: React.FC = () => {
  const { user, role } = useAuth()
  const [selectedUser, setSelectedUser] = useState<string | null>(
    role === "admin" ? null : user?.uid || null
  )
  const [users, setUsers] = useState<
    { uid: string; email: string; unreadCount: number }[]
  >([])
  const [messages, setMessages] = useState<
    { id: string; sender: string; text: string; timestamp: number }[]
  >([])
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    if (role !== "admin") return

    const fetchUsers = async () => {
      const db = getDatabase()
      const snapshot = await get(ref(db, "users"))
      if (snapshot.exists()) {
        const usersData = snapshot.val()
        const usersArray = await Promise.all(
          Object.entries(usersData).map(async ([uid, data]: any) => {
            const unreadCount = await getUnreadMessagesCount(uid)
            return {
              uid,
              email: data.email,
              unreadCount,
            }
          })
        )

        usersArray.sort((a, b) => b.unreadCount - a.unreadCount)
        setUsers(usersArray)
      }
    }

    fetchUsers()
  }, [role])

  useEffect(() => {
    if (role !== "admin" && !selectedUser && user) {
      setSelectedUser(user.uid)
    }
  }, [role, user, selectedUser])

  const conversationId = role === "admin" ? selectedUser : user?.uid || null

  useEffect(() => {
    if (conversationId) {
      listenForMessages(conversationId, setMessages)
      set(ref(db, `chats/${conversationId}/unread`), 0)
    }
  }, [conversationId])

  useEffect(() => {
    if (selectedUser) {
      const unreadRef = ref(db, `chats/${selectedUser}/unread`)
      set(unreadRef, 0)
    }
  }, [selectedUser])

  const handleSend = async () => {
    if (!newMessage.trim() || !conversationId) return
    await sendMessage(conversationId, newMessage)
    setNewMessage("")
  }

  return (
    <div className="chat-container">
      <h2>
        {role === "admin" ? "Panel administracyjny czatu" : "Chat z doradcą"}
      </h2>

      {role === "admin" && (
        <div className="user-selector">
          <label>Wybierz użytkownika:</label>
          <select
            value={selectedUser || ""}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">Wybierz...</option>
            {users.map((u) => (
              <option key={u.uid} value={u.uid}>
                {u.email}{" "}
                {u.unreadCount > 0 && `(${u.unreadCount} nieprzeczytanych)`}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="chat-messages">
        {messages.map((msg) => {
          const isCurrentUser = msg.sender === user?.uid
          return (
            <div
              key={msg.id}
              className={`message ${
                isCurrentUser ? "my-message" : "other-message"
              }`}
            >
              <span className="sender">
                {isCurrentUser
                  ? user?.email
                  : users.find((u) => u.uid === msg.sender)?.email || "Doradca"}
              </span>
              <p>{msg.text}</p>
            </div>
          )
        })}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Wpisz wiadomość..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSend}>Wyślij</button>
      </div>
    </div>
  )
}

export default Chat
