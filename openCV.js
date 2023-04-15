
// const cv = require("@techstark/opencv-js")
import cv from "@techstark/opencv-js";
console.log('Không thể tải ảnh đồng hồ');
const img = new Image();
img.src = './img/download.png';
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const section = document.querySelector('.section')
section.appendChild(canvas)
img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

    // Áp dụng phương pháp threshold để tách nền và đối tượng
    cv.threshold(gray, binary, 0, 255, cv.THRESH_BINARY_INV + cv.THRESH_OTSU);
//     const shortHand = /* code để nhận dạng kim ngắn */
//     const longHand = /* code để nhận dạng kim dài */

//       // Tính toán góc giữa kim ngắn và kim dài để tìm thời gian
//   const angleBetweenHands = /* tính toán góc giữa kim ngắn và kim dài */
//   const hours = Math.floor(angleBetweenHands / (Math.PI / 6));
//   const minutes = Math.floor((angleBetweenHands - hours * (Math.PI / 6)) / (Math.PI / 30));

    // Hiển thị thời gian
    console.log(`Thời gian trên đồng hồ là ${hours}:${minutes}`);
};

// Nếu có lỗi khi tải ảnh, hiển thị thông báo
img.onerror = function() {
  console.log('Không thể tải ảnh đồng hồ');
};