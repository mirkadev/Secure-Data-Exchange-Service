/* eslint-disable class-methods-use-this */
const S3 = require('aws-sdk/clients/s3');
const { Readable } = require('stream');

class S3Client {
  connect({ region, accessKeyId, secretAccessKey, bucketName }) {
    this.s3 = new S3({
      region,
      accessKeyId,
      secretAccessKey,
    });

    this.bucket = bucketName;
  }

  async get(filename) {
    const params = {
      Bucket: this.bucket,
      Key: filename,
    };

    try {
      const result = await this.s3.getObject(params).promise();
      if (result.Body) {
        return result.Body.toString('utf8');
      }

      return null;
    } catch (error) {
      if (error.code === 'AccessDenied') {
        return null;
      }

      throw error;
    }
  }

  async upload(data, filename) {
    const readableStream = new Readable();
    readableStream.push(data);
    readableStream.push(null);

    const uploadParams = {
      Bucket: this.bucket,
      Body: readableStream,
      Key: filename,
    };

    return this.s3.upload(uploadParams).promise();
  }

  async delete(filename) {
    const params = {
      Bucket: this.bucket,
      Key: filename,
    };

    return this.s3.deleteObject(params).promise();
  }
}

module.exports = { awsS3Client: new S3Client() };
