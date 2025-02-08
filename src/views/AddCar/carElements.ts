import styled from "styled-components"

export const Container = styled.div`
  padding: 1.5rem;
  max-width: 40rem;
  margin: 0 auto;
  background-color: ${(props) => props.theme.antiflashWhite};
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: 0.5rem;
`

export const Title = styled.h2`
  text-align: center;
  color: ${(props) => props.theme.richBlack};
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
  border: 1px solid ${(props) => props.theme.afterGrey};
  border-radius: 0.25rem;
  font-size: 1rem;
`

export const Textarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme.afterGrey};
  border-radius: 0.25rem;
  font-size: 1rem;
  min-height: 5rem;
`

export const Button = styled.button`
  background: ${(props) => props.theme.redGradient};
  color: ${(props) => props.theme.antiflashWhite};
  padding: 0.75rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.yinmnGreenAfter};
  }

  &:disabled {
    background-color: ${(props) => props.theme.afterGrey};
    cursor: not-allowed;
  }
`

export const Message = styled.p`
  margin-top: 1rem;
  text-align: center;
  color: ${(props) => props.theme.yinmnGreen};
  font-size: 1rem;
`
