async function fetchGalleries() {
    const response = await fetch('/gallery/list');
    const galleries = await response.json();
    const galleryList = document.getElementById('gallery-list');
    galleryList.innerHTML = '';
    
    galleries.forEach(galleryId => {
        const li = document.createElement('li');
        li.textContent = galleryId;
        li.classList.add('gallery-list');
        li.onclick = () => loadGalleryImages(galleryId);
        galleryList.appendChild(li);
    });
}

async function loadGalleryImages(galleryId) {
    const response = await fetch(`/gallery/${galleryId}`);
    const images = await response.json();
    const imageContainer = document.getElementById('image-container');
    imageContainer.innerHTML = '';
    
    images.forEach(image => {
        const div = document.createElement('div');
        div.innerHTML = `<img src="${image.imageUrl}" alt="Image ${image.imageId}">
                        <button onclick="deleteImage('${galleryId}', '${image.imageId}')">Delete</button>`;
        imageContainer.appendChild(div);
    });
}

async function createGallery() {
    const galleryName = document.getElementById('gallery-name').value;
    if (!galleryName) {
        alert('Please enter a gallery name');
        return;
    }
    
    try {
        const response = await fetch(`/gallery/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ galleryId: galleryName })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        alert('Gallery created/updated successfully!');
        fetchGalleries();
    } catch (error) {
        console.error('Error creating gallery:', error);
        alert(`Failed to create gallery: ${error.message}`);
    }
}

async function deleteGallery() {
    const galleryName = document.getElementById('delete-gallery-name').value;
    if (!galleryName) {
        alert('Please enter a gallery name');
        return;
    }
    
    try {
        const response = await fetch(`/gallery/delete/${galleryName}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        alert('Gallery deleted successfully!');
        fetchGalleries();
    } catch (error) {
        console.error('Error deleting gallery:', error);
        alert(`Failed to delete gallery: ${error.message}`);
    }
}

async function deleteImage(galleryId, imageId) {
console.log("Attempting to delete image...");
console.log("Gallery ID:", galleryId);
console.log("Image ID:", imageId);

if (!galleryId || !imageId) {
alert("Gallery ID and Image ID are required.");
return;
}

try {
const response = await fetch(`/gallery/${galleryId}/delete/${imageId}`, {
    method: "DELETE"
});

if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
}

alert("Image deleted successfully!");
loadGalleryImages(galleryId);
} catch (error) {
console.error("Error deleting image:", error);
alert(`Failed to delete image: ${error.message}`);
}
}



async function uploadImage() {
    const galleryName = document.getElementById('upload-gallery-name').value;
    const imageId = document.getElementById('image-id').value;
    const imageUrl = document.getElementById('image-url').value;
    
    if (!galleryName || !imageId || !imageUrl) {
        alert('Please fill in all fields');
        return;
    }
    
    try {
        const response = await fetch(`/gallery/${galleryName}/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ galleryId: galleryName, imageId, imageUrl })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        alert('Image uploaded successfully!');
        loadGalleryImages(galleryName);
    } catch (error) {
        console.error('Error uploading image:', error);
        alert(`Failed to upload image: ${error.message}`);
    }
}

fetchGalleries();