# Image Gallery with Node.js Backend

This project implements a simple image gallery with a Node.js backend. Users can upload, retrieve, and delete images through a RESTful API. The backend is built using Node.js and Express, and the frontend is a basic web interface that allows users to interact with the image gallery.

## Features

- **Image Upload**: Users can upload images through the provided API endpoint.
- **Image Retrieval**: The API provides endpoints to retrieve a list of images in the gallery.
- **Image Deletion**: Users can delete images from the gallery using the provided API.

## Project Structure

```
- image-api
  - app.js
  - public
    - css
       - styles.css
    - js
      - script.js
    - index.html
  - uploads
```

- **your_server_script.js**: The main Node.js server script that implements the backend functionality.
- **public**: Folder containing static files for the frontend.
  - **index.html**: HTML file for the web user interface.
  - **styles.css**: CSS file for styling the web pages.
  - **script.js**: JavaScript file for interacting with the backend and updating the UI.
- **uploads**: Folder where uploaded images are stored.

## Setup

1. Install Node.js and npm (Node Package Manager) on your machine.
2. Clone the repository to your local machine.
3. Open a terminal and navigate to the project directory.
4. Run `npm install` to install the required dependencies.
5. Start the Node.js server with `node app.js`.

## Usage

1. Access the web application by navigating to `http://localhost:3000` in your browser.
2. Use the provided web pages to interact with the image gallery:
   - **Display Gallery**: View a gallery of images.
   - **Upload New Images**: Upload new images to the gallery.
   - **Delete Existing Images**: Delete existing images from the gallery.
3. Images are stored in the `uploads` folder on the server.

## API Endpoints

- **POST /upload**: Upload a new image.
- **GET /gallery**: Retrieve a list of images in the gallery.
- **DELETE /image/:filename**: Delete an image by filename.

## Notes

- Images are saved with their original filenames.
- Adjust the image display size and spacing in the `script.js` file.

## Dependencies

- Express: Backend web framework for Node.js.
- Multer: Middleware for handling file uploads.


