import React, { useEffect, useState } from "react"
import {
  sendMessage,
  listenForMessages,
  getUnreadMessagesCount,
} from "../../api/firebase"
import { getDatabase, ref, get, set } from "firebase/database"
import { useAuth } from "../../AuthContext"
import { db } from "../../api/firebase"
import {
  ChatContainer,
  ChatMessages,
  Message,
  Sender,
  ChatInputContainer,
  ChatInput,
  SendButton,
  UserSelector,
} from "./chatElemenets"

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
      set(ref(db, `chats/${selectedUser}/unread`), 0)
    }
  }, [selectedUser])

  const handleSend = async () => {
    if (!newMessage.trim() || !conversationId) return
    await sendMessage(conversationId, newMessage)
    setNewMessage("")
  }

  return (
    <ChatContainer>
      <h2>
        {role === "admin" ? "Panel administracyjny czatu" : "Chat z doradcą"}
      </h2>

      {role === "admin" && (
        <UserSelector>
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
        </UserSelector>
      )}

      <ChatMessages>
        {messages.map((msg) => {
          const isCurrentUser = msg.sender === user?.uid
          return (
            <Message key={msg.id} isCurrentUser={isCurrentUser}>
              <Sender>
                {isCurrentUser
                  ? user?.email
                  : users.find((u) => u.uid === msg.sender)?.email || "Doradca"}
              </Sender>
              <p>{msg.text}</p>
            </Message>
          )
        })}
      </ChatMessages>

      <ChatInputContainer>
        <ChatInput
          type="text"
          placeholder="Wpisz wiadomość..."
          value={newMessage}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setNewMessage(e.target.value)
          }
        />
        <SendButton onClick={handleSend}>Wyślij</SendButton>
      </ChatInputContainer>
    </ChatContainer>
  )
}

export default Chat
