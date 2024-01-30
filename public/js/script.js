document.addEventListener('DOMContentLoaded', () => {
    // Initial load of gallery images
    updateGallery();

    // Fetch and update gallery every 5 seconds
    setInterval(updateGallery, 5000);
});

function updateGallery() {
    // Fetch images from the server and update the gallery section
    fetchGallery()
        .then(images => displayGallery(images))
        .catch(error => console.error('Error fetching gallery:', error));
}

function fetchGallery() {
    return fetch('http://localhost:3000/gallery')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch gallery');
            }
            return response.json();
        })
        .then(data => data.images)
        .catch(error => {
            console.error('Error fetching gallery:', error);
            throw error;
        });
}

function uploadImage() {
    const input = document.getElementById('imageInput');
    const file = input.files[0];

    if (file) {
        const formData = new FormData();
        formData.append('image', file);

        fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to upload image');
                }
                input.value = '';
                updateGallery();
            })
            .catch(error => console.error('Error uploading image:', error));
    }
}


function displayGallery(images) {
    const gallerySection = document.getElementById('gallery');
    gallerySection.innerHTML = '';

    images.forEach(image => {
        const imgContainer = document.createElement('div'); // Create a container for each image
        const imgElement = document.createElement('img');
        imgElement.src = `/image/${image}`;
        imgElement.alt = image;
        imgElement.style.width = '300px';
        imgElement.style.height = '300px';
        imgElement.style.margin = '10px';

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => deleteImage(image));

        imgContainer.appendChild(imgElement);
        imgContainer.appendChild(deleteButton);
        gallerySection.appendChild(imgContainer);
    });
}

function deleteImage(filename) {
    fetch(`http://localhost:3000/image/${filename}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete image');
            }
            updateGallery();
        })
        .catch(error => console.error('Error deleting image:', error));
}

