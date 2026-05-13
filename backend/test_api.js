import fs from 'fs';

async function testUpload() {
  const formData = new FormData();
  const fileBuffer = fs.readFileSync('test.png');
  const blob = new Blob([fileBuffer], { type: 'image/png' });
  formData.append('image', blob, 'test.png');

  try {
    const response = await fetch('http://localhost:5000/api/analyze', {
      method: 'POST',
      body: formData,
    });
    
    const result = await response.json();
    console.log("Status:", response.status);
    console.log("Response:", result);
  } catch (error) {
    console.error("Fetch Error:", error);
  }
}

testUpload();
