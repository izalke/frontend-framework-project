from flask import Flask, request, jsonify
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

NEXTCLOUD_URL = "https://dysk.chaoxly.eu/remote.php/dav/files/gallery/data"
NEXTCLOUD_USERNAME = "..."
NEXTCLOUD_PASSWORD = "..."

@app.route('/api/upload-gallery', methods=['POST'])
def upload_gallery_files():
    if 'file' not in request.files:
        return jsonify({"error": "Brak pliku w żądaniu"}), 400

    file = request.files['file']  
    uploaded_files = []

    if file:
        nextcloud_path = f"{NEXTCLOUD_URL}/{file.filename.replace('\\', '/')}"
        response = requests.put(
            nextcloud_path,
            data=file.stream,
            auth=(NEXTCLOUD_USERNAME, NEXTCLOUD_PASSWORD)
        )
        if response.status_code in [200, 201]:
            uploaded_files.append(file.filename)
        else:
            return jsonify({
                "error": f"Nie udało się przesłać pliku {file.filename}",
                "details": response.text
            }), response.status_code
    return jsonify({"message": "Pliki przesłane", "files": uploaded_files}), 200

@app.route('/api/upload-auction/<auction_id>', methods=['POST'])
def upload_auction_files(auction_id):
    if 'file' not in request.files:
        return jsonify({"error": "Brak pliku w żądaniu"}), 400

    file = request.files['file']  
    uploaded_files = []

    if file:
        nextcloud_path = f"{NEXTCLOUD_URL}/{auction_id}/{file.filename.replace('\\', '/')}"
        response = requests.put(
            nextcloud_path,
            data=file.stream,
            auth=(NEXTCLOUD_USERNAME, NEXTCLOUD_PASSWORD)
        )
        if response.status_code in [200, 201]:
            uploaded_files.append(file.filename)
        else:
            return jsonify({
                "error": f"Nie udało się przesłać pliku {file.filename}",
                "details": response.text
            }), response.status_code
    return jsonify({"message": "Pliki przesłane", "files": uploaded_files}), 200

@app.route('/api/create-folder/<auction_id>', methods=['POST'])
def create_auction_folder(auction_id):
    folder_path = f"{NEXTCLOUD_URL}/{auction_id}/"
    response = requests.request(
        "MKCOL",
        folder_path,
        auth=(NEXTCLOUD_USERNAME, NEXTCLOUD_PASSWORD)
    )
    if response.status_code in [201, 200]:
        return jsonify({"message": f"Folder {auction_id} utworzony"}), 201
    else:
        return jsonify({
            "error": "Nie udało się utworzyć folderu",
            "details": response.text
        }), response.status_code

@app.route('/api/get-files/<auction_id>', methods=['GET'])
def get_auction_files(auction_id):
    folder_path = f"{NEXTCLOUD_URL}/{auction_id}"
    response = requests.request(
        "PROPFIND",
        folder_path,
        auth=(NEXTCLOUD_USERNAME, NEXTCLOUD_PASSWORD),
        headers={"Depth": "1"}
    )
    if response.status_code != 207:
        return jsonify({"error": "Nie udało się pobrać listy plików", "details": response.text}), response.status_code

    tree = ET.fromstring(response.text)
    namespace = {"d": "DAV:"}
    files = []
    for element in tree.findall(".//d:response", namespace):
        href = element.find("d:href", namespace)
        if href is not None:
            file_name = os.path.basename(href.text.strip('/'))
            if file_name != auction_id:
                files.append(file_name)

    return jsonify({"files": files}), 200

@app.route('/api/data/<auction_id>/<filename>')
def serve_file(auction_id, filename):
    file_url = f"{NEXTCLOUD_URL}/{auction_id}/{filename.replace(' ', '%20')}"  
    response = requests.get(file_url, auth=(NEXTCLOUD_USERNAME, NEXTCLOUD_PASSWORD))
    if response.status_code == 200:
        mime_type, _ = guess_type(filename)  
        mime_type = mime_type or 'application/octet-stream'  
        return response.content, 200, {'Content-Type': mime_type}
    else:
        app.logger.error(f"Failed to retrieve file: {file_url} from Nextcloud")
        return jsonify({"error": "File not found on Nextcloud"}), 404

if __name__ == '__main__':
    app.run(debug=True)