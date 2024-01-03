export function getImageUrl(person?: { imageId?: string }, size = 's') {
    if (person && person.imageId) {
        return `https://i.imgur.com/${person.imageId}${size}.jpg`;
    }

    // Provide a default image URL or handle the case where imageId is missing
    return 'my-app/src/Grad_09.png'; // Replace with your default image URL or handle accordingly
}

