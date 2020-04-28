const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();
const crypto = require('crypto');

exports.handler = async (event) => {
  let params = {};
  let statusCode = 0;
  let responseBody = '';
  
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
      // TODO: First check if slug already exists
      let shortUrlSlug = crypto.randomBytes(3).toString('hex'); 
      params = {
        TableName: 'urls',
        Item: {
          shortUrlSlug: shortUrlSlug,
          longUrl: event.longUrl, // TODO: Clean up https:// or http:// and/or www. in frontend
        }
      }
      try {
        await documentClient.put(params).promise();
        statusCode = 201;
        responseBody = shortUrlSlug;
      } catch (err) {
        statusCode = 403;
        responseBody = 'Unable to shorten URL';
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
        statusCode = 200;
        responseBody = data.Item.longUrl;
      } catch (err) {
        statusCode = 404;
        responseBody = 'Unable to retrieve original URL';
      }
      break;

    default:
      statusCode = 400;
      responseBody = 'Invalid operation'
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