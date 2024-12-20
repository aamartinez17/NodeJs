const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'public', 'data.json'), 'utf-8');
    return {
      statusCode: 200,
      body: data,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to read data' }),
      headers: {
        "Content-Type": "application/json"
      }
    };
  }
};