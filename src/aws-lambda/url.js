const AWS = require('aws-sdk');
// const crypto = require('crypto');

exports.handler = async (event) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let longUrl = '';
  let params = {};
  let responseBody = '';
  let statusCode = 0;

  // Write to database

  if (event.body) {
    longUrl = event.body.longUrl;
    params = {
      TableName: 'urls',
      Item: {
        // shortUrlSlug: crypto.randomBytes(6).toString('hex')
        shortUrlSlug: '54321',
        longUrl: longUrl, // TODO: Clean up https:// or http:// and/or www. in frontend
      }
    }

    try {
      // TODO: First check to see if URL already exists
      const data = await documentClient.put(params).promise();
      responseBody = JSON.stringify(data);
      statusCode = 201;
    } catch (err) {
      responseBody = 'Unable to shorten URL';
      statusCode = 403;
    }
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
};
