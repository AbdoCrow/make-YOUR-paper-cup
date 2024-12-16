// Selectors
const cupImage = document.getElementById("cupImage");
const colorOptions = document.querySelectorAll('input[name="cupColor"]');
const textInput = document.getElementById("textInput");
const textColor = document.getElementById("textColor");
const textSize = document.getElementById("textSize");
const customText = document.getElementById("customText");
const stickerOptions = document.querySelectorAll(".sticker-option");
const stickerImage = document.getElementById("stickerImage");
const clearStickerButton = document.getElementById("clearSticker");
const cupPreview = document.getElementById("cupPreview");

// Change cup image when color is selected
colorOptions.forEach((option) => {
  option.addEventListener("change", () => {
    cupImage.src = option.dataset.image;
  });
});

// Update custom text
textInput.addEventListener("input", () => {
  customText.textContent = textInput.value;
});

textColor.addEventListener("input", () => {
  customText.style.color = textColor.value;
});

textSize.addEventListener("input", () => {
  customText.style.fontSize = `${textSize.value}px`;
});

// Add sticker
stickerOptions.forEach((sticker) => {
  sticker.addEventListener("click", () => {
    stickerImage.src = sticker.dataset.sticker;
    stickerImage.style.display = "block";
    stickerImage.style.left = "50%";
    stickerImage.style.top = "50%";
    stickerImage.style.transform = "translate(-50%, -50%)";
    stickerImage.style.position = "absolute";
    stickerImage.style.cursor = "grab";
  });
});

// Clear sticker
clearStickerButton.addEventListener("click", () => {
  stickerImage.style.display = "none";
});

// Draggable Sticker - Fix to follow cursor relative to container
let isDragging = false;
let offsetX, offsetY;

// Mouse Down Event
stickerImage.addEventListener("mousedown", (e) => {
  isDragging = true;

  // Calculate offset relative to the cup preview container
  const rect = cupPreview.getBoundingClientRect();
  offsetX = e.clientX - stickerImage.getBoundingClientRect().left;
  offsetY = e.clientY - stickerImage.getBoundingClientRect().top;

  stickerImage.style.cursor = "grabbing";

  // Prevent default behavior
  e.preventDefault();
});

// Mouse Move Event
document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  // Get cup container boundaries
  const rect = cupPreview.getBoundingClientRect();

  // Calculate new position relative to the container
  let newX = e.clientX - rect.left - offsetX;
  let newY = e.clientY - rect.top - offsetY;

  // Prevent the sticker from leaving the container boundaries
  newX = Math.max(0, Math.min(rect.width - stickerImage.offsetWidth, newX));
  newY = Math.max(0, Math.min(rect.height - stickerImage.offsetHeight, newY));

  // Set the new position
  stickerImage.style.left = `${newX}px`;
  stickerImage.style.top = `${newY}px`;
});

// Mouse Up Event
document.addEventListener("mouseup", () => {
  isDragging = false;
  stickerImage.style.cursor = "grab";
});
