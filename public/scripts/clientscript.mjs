// Register Service Worker (if available)
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js")
        .then(() => console.log("Service Worker Registered"))
        .catch((error) => console.error("Service Worker Registration Failed:", error));
}
let currentGalleryId = null;

const API_BASE_URL = "http://127.0.0.1:8001";

async function fetchGalleries() {
    try {
        const response = await fetch(`${API_BASE_URL}/galleries`);
        if (!response.ok) throw new Error(`Error fetching galleries: ${response.statusText}`);

        const galleries = await response.json();
        const galleryList = document.getElementById('gallery-list');
        galleryList.innerHTML = '';

        galleries.forEach(gallery => {
            const li = document.createElement('li');
            li.textContent = gallery.name;
            li.classList.add('gallery-item');
            li.onclick = () => loadGalleryImages(gallery.id);
            galleryList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching galleries:', error);
        alert('Failed to fetch galleries. Please try again.');
    }
}
async function loadGalleryImages(galleryId) {
    if (!galleryId) {
        alert("Invalid gallery ID.");
        return;
    }

    currentGalleryId = galleryId;

    try {
        const response = await fetch(`${API_BASE_URL}/galleries/${galleryId}/images`);
        if (!response.ok) throw new Error(`Error fetching images: ${response.statusText}`);

        const images = await response.json();
        const imageContainer = document.getElementById('image-container');
        imageContainer.innerHTML = '';

        images.forEach(image => {
            const div = document.createElement('div');
            div.classList.add('image-item');
            div.innerHTML = `
                <img src="${image.url}" alt="Image ${image.id}" loading="lazy">
                <p>${image.description || `Image ${image.id}`}</p>
                <button onclick="deleteImage(${galleryId}, ${image.id})">Delete</button>
                <div class="update-image-link">
                    <input type="text" id="new-url-${image.id}" placeholder="New Image URL">
                    <button onclick="updateImageLink(${image.id})">Update Link</button>
                </div>
            `;
            imageContainer.appendChild(div);
        });        
    } catch (error) {
        console.error('Error loading gallery images:', error);
        alert('Failed to load gallery images. Please try again.');
    }
}

async function createGallery() {
    const galleryName = document.getElementById('gallery-name').value.trim();
    if (!galleryName) {
        alert("Please enter a gallery name.");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/galleries`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: galleryName })
        });

        if (!response.ok) throw new Error(`Error creating gallery: ${response.statusText}`);

        alert("Gallery created/updated successfully!");
        fetchGalleries(); // Refresh gallery list
    } catch (error) {
        console.error('Error creating gallery:', error);
        alert(`Failed to create gallery: ${error.message}`);
    }
}

// Delete a Gallery
async function deleteGallery() {
    const galleryName = document.getElementById('delete-gallery-name').value.trim();
    if (!galleryName) {
        alert("Please enter a gallery name.");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/galleries/${galleryName}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error(`Error deleting gallery: ${response.statusText}`);

        alert("Gallery deleted successfully!");
        fetchGalleries(); // Refresh gallery list
    } catch (error) {
        console.error('Error deleting gallery:', error);
        alert(`Failed to delete gallery: ${error.message}`);
    }
}

async function uploadImageToGallery() {
    if (!currentGalleryId) {
        alert("No gallery selected. Please select a gallery first.");
        return;
    }

    const imageUrl = document.getElementById('image-url-input').value.trim();
    if (!imageUrl) {
        alert("Please enter an image URL.");
        return;
    }
        const response = await fetch(`${API_BASE_URL}/galleries/${currentGalleryId}/images`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: imageUrl })
        });

        if (!response.ok) throw new Error(`Error uploading image: ${response.statusText}`);

        const result = await response.json();
        alert("Image uploaded successfully!");
        addImageToDom(result.image);
}


function addImageToDom(image) {
    const imageContainer = document.getElementById('image-container');
    const div = document.createElement('div');
    div.classList.add('image-item');
    div.innerHTML = `
        <img src="${image.url}" alt="Uploaded Image" loading="lazy">
        <p>${image.description || "Uploaded Image"}</p>
        <button onclick="deleteImage(${currentGalleryId}, ${image.id})">Delete</button>
    `;
    imageContainer.appendChild(div);
}


async function deleteImage(galleryId, imageId) {
    if (!galleryId || !imageId) {
        alert("Gallery ID and Image ID are required.");
        return;
    }

    console.log("Gallery ID:", galleryId);
    console.log("Image ID:", imageId);

    try {
        const response = await fetch(`/galleries/${galleryId}/images/${imageId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            console.warn(`Failed to delete image from backend. Status: ${response.status} - ${response.statusText}`);
            throw new Error(`Error deleting image: ${response.statusText}`);
        }

        removeImageFromDOM(imageId);
        alert("Image deleted successfully!");
    } catch (error) {
        console.error("Error deleting image from backend:", error);
        alert("Failed to delete the image. Check the console for details.");
    }
}

function removeImageFromDOM(imageId) {
    const imageElement = document.querySelector(`img[data-image-id="${imageId}"]`);
    if (imageElement) {
        const parentDiv = imageElement.closest(".image-item");
        if (parentDiv) {
            parentDiv.remove();
        }
    } else {
        console.warn("Image element not found in DOM for ID:", imageId);
    }
}

async function deleteCurrentGallery() {
    if (!currentGalleryId) {
        alert("No gallery is selected. Please select a gallery first.");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/galleries/${currentGalleryId}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error(`Error deleting gallery: ${response.statusText}`);

        alert("Gallery deleted successfully!");

        // Clear the gallery images section and refresh the gallery list
        document.getElementById('image-container').innerHTML = '';
        currentGalleryId = null; // Reset current gallery ID
        fetchGalleries();
    } catch (error) {
        console.error('Error deleting gallery:', error);
        alert(`Failed to delete the gallery: ${error.message}`);
    }
}
async function updateImageLink(imageId) {
    const newUrlInput = document.getElementById(`new-url-${imageId}`);
    const newUrl = newUrlInput.value.trim();

    if (!newUrl) {
        alert("Please enter a new URL.");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/galleries/${currentGalleryId}/images/${imageId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newUrl })
        });

        if (!response.ok) throw new Error(`Error updating image link: ${response.statusText}`);

        const updatedImage = await response.json();
        alert("Image link updated successfully!");

        // Update the image link in the DOM
        const imageElement = document.querySelector(`img[alt='Image ${imageId}']`);
        if (imageElement) {
            imageElement.src = updatedImage.url;
        }
    } catch (error) {
        console.error("Error updating image link:", error);
        alert(`Failed to update image link: ${error.message}`);
    }
}

fetchGalleries();
