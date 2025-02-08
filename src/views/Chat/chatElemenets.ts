import styled from "styled-components"

export const ChatContainer = styled.div`
  width: 50%;
  margin: auto;
  padding: 20px;
  border-radius: 10px;
  background: ${({ theme }) => theme.whiteOnly};
  box-shadow: ${({ theme }) => theme.shadow};
  margin-top: 8rem;
`

export const ChatMessages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 400px;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.afterGrey};
  background: ${({ theme }) => theme.antiflashWhite};
  border-radius: 8px;
`

export const Message = styled.div<{ isCurrentUser: boolean }>`
  max-width: 70%;
  padding: 10px;
  border-radius: 8px;
  word-wrap: break-word;
  align-self: ${({ isCurrentUser }) =>
    isCurrentUser ? "flex-end" : "flex-start"};
  background: ${({ isCurrentUser, theme }) =>
    isCurrentUser ? theme.yinmnGreen : theme.afterGrey};
  color: ${({ isCurrentUser }) => (isCurrentUser ? "white" : "black")};
  text-align: ${({ isCurrentUser }) => (isCurrentUser ? "right" : "left")};
`

export const Sender = styled.span`
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
  color: ${({ theme }) => theme.richBlack};
`

export const ChatInputContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`

export const ChatInput = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.afterGrey};
  background: ${({ theme }) => theme.antiflashWhite};
  color: ${({ theme }) => theme.richBlack};
`

export const SendButton = styled.button`
  padding: 10px;
  background: ${({ theme }) => theme.yinmnGreen};
  color: ${({ theme }) => theme.antiflashWhite};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: ${({ theme }) => theme.yinmnGreenAfter};
  }
`

export const UserSelector = styled.div`
  margin-bottom: 10px;

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: ${({ theme }) => theme.richBlack};
  }

  select {
    width: 100%;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.afterGrey};
    background: ${({ theme }) => theme.antiflashWhite};
    color: ${({ theme }) => theme.richBlack};
  }
`
