const axios = require('axios');

const testRunwareAPI = async () => {
  const apiKey = 'lAeips49wA2NO3emBO5Dlvi5BUy7MSiv';
  const baseURL = 'https://api.runware.ai/v1';
  
  // Generate proper UUIDv4
  const taskUUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
  
  const requestData = [{
    taskType: "imageInference",
    taskUUID: taskUUID,
    positivePrompt: "a beautiful landscape with mountains and a lake",
    model: "runware:101@1", // FLUX.1 Dev model
    width: 1024,
    height: 1024,
    outputType: "URL",
    outputFormat: "JPG", 
    deliveryMethod: "sync",
    steps: 20,
    CFGScale: 3.5
  }];

  console.log('Testing Runware API...');
  console.log('Request:', JSON.stringify(requestData, null, 2));

  try {
    const response = await axios.post(baseURL, requestData, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 120000
    });

    console.log('Success! Response:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error:', error.response?.status, error.response?.statusText);
    console.error('Response data:', JSON.stringify(error.response?.data, null, 2));
  }
};

testRunwareAPI();