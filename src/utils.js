"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImageUrl = void 0;
function getImageUrl(person, size) {
    if (size === void 0) { size = 's'; }
    if (person && person.imageId) {
        return "https://i.imgur.com/".concat(person.imageId).concat(size, ".jpg");
    }
    // Provide a default image URL or handle the case where imageId is missing
    return 'my-app/src/Grad_09.png'; // Replace with your default image URL or handle accordingly
}
exports.getImageUrl = getImageUrl;
