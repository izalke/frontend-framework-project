from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import requests
import logging
from mimetypes import guess_type
from xml.etree import ElementTree as ET

app = Flask(__name__)

logging.basicConfig(level=logging.DEBUG)
app.logger.setLevel(logging.DEBUG)

CORS(app)

NEXTCLOUD_URL = "..."
NEXTCLOUD_USERNAME = "..."
NEXTCLOUD_PASSWORD = "..."


@app.route('/api/upload', methods=['POST'])
def upload_files():
    if 'file' not in request.files:
        app.logger.error("No files part in the request")
        return jsonify({"error": "No files part in the request"}), 400

    file = request.files['file']  
    app.logger.debug(f"Received file: {file.filename}")

    uploaded_files = []

    if file:
        app.logger.debug(f"Uploading file: {file.filename}")
        nextcloud_path = f"{NEXTCLOUD_URL}/{file.filename.replace('\\', '/')}"

        response = requests.put(
            nextcloud_path,
            data=file.stream,
            auth=(NEXTCLOUD_USERNAME, NEXTCLOUD_PASSWORD)
        )

        if response.status_code in [200, 201]:
            uploaded_files.append(file.filename)
            app.logger.info(f"File {file.filename} uploaded successfully")
        else:
            app.logger.error(f"Failed to upload {file.filename}, Response: {response.text}")
            return jsonify({
                "error": f"Failed to upload {file.filename}",
                "details": response.text
            }), response.status_code

    app.logger.info("Files uploaded successfully")
    return jsonify({"message": "Files uploaded successfully", "files": uploaded_files}), 200



@app.route('/api/files', methods=['GET'])
def list_files():
    response = requests.request(
        "PROPFIND",
        NEXTCLOUD_URL,
        auth=(NEXTCLOUD_USERNAME, NEXTCLOUD_PASSWORD),
        headers={"Depth": "1"}
    )

    if response.status_code != 207:
        return jsonify({"error": "Failed to fetch file list", "details": response.text}), response.status_code

    # Parse the XML response from Nextcloud to extract file names
    tree = ET.fromstring(response.text)
    namespace = {"d": "DAV:"}

    files = []
    for element in tree.findall(".//d:response", namespace):
        href = element.find("d:href", namespace)
        if href is not None:
            file_name = os.path.basename(href.text.strip('/'))
            if file_name and file_name != "data":  # Skip data folder
                files.append(file_name)

    return jsonify({"files": files}), 200



@app.route('/data/<filename>')
def serve_file(filename):
   
    file_url = f"{NEXTCLOUD_URL}/{filename.replace(' ', '%20')}"  

    # File download from nextcloud
    response = requests.get(file_url, auth=(NEXTCLOUD_USERNAME, NEXTCLOUD_PASSWORD))

    if response.status_code == 200:
        mime_type, _ = guess_type(filename)  
        mime_type = mime_type or 'application/octet-stream'  

        return response.content, 200, {'Content-Type': mime_type}
    else:
        app.logger.error(f"Failed to retrieve file: {filename} from Nextcloud")
        return jsonify({"error": "File not found on Nextcloud"}), 404



if __name__ == '__main__':
    app.run(debug=True)
