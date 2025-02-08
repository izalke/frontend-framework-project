import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User,
} from "firebase/auth"
import {
  getDatabase,
  ref,
  get,
  push,
  set,
  remove,
  onValue,
} from "firebase/database"
import firebaseConfig from "./firebaseconfig.json"

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const auth = getAuth()
const db = getDatabase(app)

const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    const user = userCredential.user

    await updateProfile(user, { displayName: email })

    await set(ref(db, `users/${user.uid}`), {
      email: user.email,
      role: "user",
    })

    return user
  } catch (error) {
    throw error
  }
}

const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )

    return userCredential.user
  } catch (error) {
    throw error
  }
}

const signOutUser = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    throw error
  }
}

const getCurrentUser = (): Promise<{
  user: User | null
  role: string | null
}> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const roleSnapshot = await get(ref(db, `users/${user.uid}/role`))
        const role = roleSnapshot.exists() ? roleSnapshot.val() : "user"
        resolve({ user, role })
      } else {
        resolve({ user: null, role: null })
      }
      unsubscribe()
    })
  })
}

const updateUserProfile = async (newName: string) => {
  try {
    const user = auth.currentUser
    if (!user) throw new Error("User not log in.")

    await updateProfile(user, { displayName: newName })
    return user
  } catch (error) {
    throw error
  }
}

const addAuction = async (auctionData: any) => {
  try {
    const user = auth.currentUser
    if (!user) {
      throw new Error("Need to be log in to add auction.")
    }

    const newAuctionRef = push(ref(db, "auctions"))
    await set(newAuctionRef, {
      ...auctionData,
      userId: user.uid,
      createdAt: new Date().toISOString(),
    })

    return newAuctionRef.key
  } catch (error) {
    console.error("Error while adding auction:", error)
    return null
  }
}

const getAuctions = async () => {
  try {
    const snapshot = await get(ref(db, "auctions"))
    if (!snapshot.exists()) return []

    const auctionsData = snapshot.val()
    return Object.keys(auctionsData).map((key) => ({
      id: key,
      ...auctionsData[key],
    }))
  } catch (error) {
    console.error("Error downloading auction", error)
    return []
  }
}

const deleteAuctionFromFirebase = async (auctionId: string) => {
  try {
    const auctionRef = ref(db, `auctions/${auctionId}`)
    await remove(auctionRef)

    return true
  } catch (error) {
    return false
  }
}

const createChat = async (userId: string, adminId: string) => {
  const chatRef = ref(db, "chats")
  const newChat = push(chatRef)
  await set(newChat, {
    users: { [userId]: true, [adminId]: true },
    messages: {},
  })

  return newChat.key
}

const sendMessage = async (chatId: string, text: string) => {
  try {
    const user = auth.currentUser
    if (!user) throw new Error("You need to be log in to send messages.")

    const messageRef = push(ref(db, `chats/${chatId}/messages`))
    await set(messageRef, {
      sender: user.uid,
      text,
      timestamp: Date.now(),
      read: false,
    })

    const chatRef = ref(db, `chats/${chatId}/unread`)
    const snapshot = await get(chatRef)
    const unreadCount = snapshot.exists() ? snapshot.val() : 0

    await set(chatRef, unreadCount + 1)
  } catch (error) {}
}

const getUnreadMessagesCount = async (chatId: string) => {
  try {
    const chatRef = ref(db, `chats/${chatId}/unread`)
    const snapshot = await get(chatRef)
    return snapshot.exists() ? snapshot.val() : 0
  } catch (error) {
    return 0
  }
}

const listenForMessages = (
  chatId: string,
  callback: (messages: any[]) => void
) => {
  const messagesRef = ref(db, `chats/${chatId}/messages`)

  onValue(messagesRef, (snapshot) => {
    if (snapshot.exists()) {
      const messages = Object.entries(snapshot.val()).map(
        ([key, value]: any) => ({
          id: key,
          ...value,
        })
      )
      callback(messages)
    } else {
      callback([])
    }
  })
}

const getOrCreateChat = async (userId: string, adminId: string) => {
  const db = getDatabase()
  const chatRef = ref(db, `chats`)

  const snapshot = await get(chatRef)
  if (snapshot.exists()) {
    const chats = snapshot.val()
    const existingChatId = Object.keys(chats).find((chatId) => {
      const chatUsers = chats[chatId].users
      return chatUsers[userId] && chatUsers[adminId]
    })

    if (existingChatId) return existingChatId
  }

  const newChatRef = push(chatRef)
  await set(newChatRef, {
    users: { [userId]: true, [adminId]: true },
    messages: {},
  })

  return newChatRef.key
}

const getTotalUnreadMessages = async (userId: string, isAdmin: boolean) => {
  try {
    const db = getDatabase()
    if (isAdmin) {
      const chatRef = ref(db, "chats")
      const snapshot = await get(chatRef)
      if (!snapshot.exists()) return 0

      const chats = snapshot.val()
      return Object.values(chats).reduce(
        (total, chat: any) => total + (chat.unread || 0),
        0
      )
    } else {
      const userChatRef = ref(db, `chats/${userId}/unread`)
      const snapshot = await get(userChatRef)
      return snapshot.exists() ? snapshot.val() : 0
    }
  } catch (error) {
    return 0
  }
}

export {
  auth,
  app,
  analytics,
  registerUser,
  signIn,
  signOutUser,
  getCurrentUser,
  updateUserProfile,
  db,
  ref,
  get,
  addAuction,
  getAuctions,
  deleteAuctionFromFirebase,
  createChat,
  sendMessage,
  listenForMessages,
  getOrCreateChat,
  getUnreadMessagesCount,
  getTotalUnreadMessages,
}
