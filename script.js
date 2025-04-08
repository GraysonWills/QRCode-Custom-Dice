document.addEventListener('DOMContentLoaded', function() {
    const urlInput = document.getElementById('url-input');
    const sizeInput = document.getElementById('size-input');
    const paddingInput = document.getElementById('padding-input');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const qrCanvas = document.getElementById('qr-canvas');
    
    // Generate QR code
    generateBtn.addEventListener('click', function() {
        const url = urlInput.value.trim();
        const size = parseInt(sizeInput.value);
        
        if (!url) {
            alert('Please enter a valid URL');
            return;
        }
        
        if (size < 100 || size > 1000) {
            alert('Size must be between 100 and 1000 pixels');
            return;
        }
        
        // Generate QR code
        QRCode.toCanvas(qrCanvas, url, {
            width: size,
            margin: 1,
            color: {
                dark: '#000000',
                light: '#ffffff'
            }
        }, function(error) {
            if (error) {
                console.error(error);
                alert('Error generating QR code');
            } else {
                downloadBtn.disabled = false;
            }
        });
    });
    
    // Download QR code as PNG with padding
    downloadBtn.addEventListener('click', function() {
        const url = urlInput.value.trim();
        if (!url) return;
        
        const padding = parseInt(paddingInput.value) || 100; // Use input padding or default to 100px
        const qrSize = qrCanvas.width;
        
        // Create a new canvas with padding
        const paddedCanvas = document.createElement('canvas');
        const paddedSize = qrSize + (padding * 2);
        paddedCanvas.width = paddedSize;
        paddedCanvas.height = paddedSize;
        
        // Get context and fill with white background
        const ctx = paddedCanvas.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, paddedSize, paddedSize);
        
        // Draw the QR code in the center
        ctx.drawImage(qrCanvas, padding, padding);
        
        // Create a temporary link element
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = paddedCanvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
