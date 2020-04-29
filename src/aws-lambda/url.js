const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();
const crypto = require('crypto');

exports.handler = async (event) => {
  let params = {};
  let statusCode = 0;
  let responseBody = '';
  const body = JSON.parse(event.body);
  
  switch (body.operation) {
    case 'create':
      // TODO: First check if slug already exists
      let shortUrlSlug = crypto.randomBytes(3).toString('hex'); 
      params = {
        TableName: 'urls',
        Item: {
          shortUrlSlug: shortUrlSlug,
          longUrl: body.longUrl,
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
          shortUrlSlug: body.shortUrlSlug
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
      responseBody = 'Invalid operation. Request event: ' + JSON.stringify(event);
  }

  const response = {
      statusCode: statusCode,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: responseBody
  };

  return response;
}