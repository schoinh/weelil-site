const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();
const crypto = require('crypto');

exports.handler = async (event) => {
  let params = {};
  let responseBody = '';
  let statusCode = 0;
  
  /*
  createEvent = {
    'operation': 'create',
    'longUrl': 'nahyungchoi.com'
  }

  readEvent = {
    'operation': 'read',
    'shortUrlSlug': '54321'
  }
  */

  switch (event.operation) {
    case 'create':
      // TODO: First check to see if URL already exists
      params = {
        TableName: 'urls',
        Item: {
          shortUrlSlug: crypto.randomBytes(3).toString('hex'),
          longUrl: event.longUrl, // TODO: Clean up https:// or http:// and/or www. in frontend
        }
      }
      try {
        const data = await documentClient.put(params).promise();
        responseBody = JSON.stringify(data); // FIXME: data should contain something
        statusCode = 201;
      } catch (err) {
        responseBody = 'Unable to shorten URL';
        statusCode = 403;
      }
      break;

    case 'read':
      params = {
        TableName: 'urls',
        Key: {
          shortUrlSlug: event.shortUrlSlug
        }
      }
      try {
        const data = await documentClient.get(params).promise();
        responseBody = data.Item.longUrl;
        statusCode = 200;
      } catch (err) {
        responseBody = 'Unable to retrieve original URL';
        statusCode = 404;
      }
      break;

    default:
      responseBody = 'Invalid operation'
      statusCode = 400;
  }

  const response = {
      statusCode: statusCode,
      headers: {
        'Content-Type': 'application/json',
        'access-control-allow-origin': '*'
      },
      body: responseBody
  };

  return response;
}