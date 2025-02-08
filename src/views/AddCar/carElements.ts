import styled from "styled-components"

export const Container = styled.div`
  padding: 1.5rem;
  max-width: 40rem;
  margin: 0 auto;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
`

export const Title = styled.h2`
  text-align: center;
  color: #333;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  font-size: 1rem;
`

export const Textarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  font-size: 1rem;
  min-height: 5rem;
`

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`

export const Message = styled.p`
  margin-top: 1rem;
  text-align: center;
  color: green;
  font-size: 1rem;
`
