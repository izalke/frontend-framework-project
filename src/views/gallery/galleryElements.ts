import styled from "styled-components"

export const GalleryContainer = styled.div`
  padding: 20px;
`

export const GalleryHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;

  h2 {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
    color: #666;
  }
`

export const GalleryForm = styled.form`
  text-align: center;
  margin-bottom: 20px;

  input {
    margin-right: 10px;
  }

  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }

    &:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
  }
`

export const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`

export const GalleryItem = styled.div`
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`

// Modal Styles
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`

export const ModalContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90%;
  background-color: white;
  padding: 20px;
  text-align: center;
`

export const ModalImage = styled.img`
  width: 100%;
  max-height: 80vh;
  object-fit: contain;
  margin-bottom: 20px;
`

export const ModalButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  z-index: 1;

  &:focus {
    outline: none;
  }

  &:hover {
    opacity: 0.7;
  }
`

export const PrevButton = styled(ModalButton)`
  left: 10px;
`

export const NextButton = styled(ModalButton)`
  right: 10px;
`
