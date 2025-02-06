import React, { useState } from "react"

const FileUploader = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const [uploadStatus, setUploadStatus] = useState("")

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files)
  }

  const handleFileUpload = async () => {
    if (!selectedFiles) {
      setUploadStatus("Please select files to upload.")
      return
    }

    const formData = new FormData()
    Array.from(selectedFiles).forEach((file) => {
      formData.append("files", file)
    })

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        setUploadStatus("Files uploaded successfully!")
      } else {
        setUploadStatus("Error uploading files.")
      }
    } catch (error) {
      console.error("Upload error:", error)
      setUploadStatus("Upload failed.")
    }
  }

  return (
    <div>
      <h1>File Uploader</h1>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  )
}

export default FileUploader
