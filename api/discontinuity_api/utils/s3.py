import boto3
from botocore.client import BaseClient
import os
import logging
from botocore.exceptions import ClientError
import chardet

logger = logging.getLogger(__name__)

AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")

def s3Client() -> BaseClient:
    s3 = boto3.client(service_name='s3', aws_access_key_id=AWS_ACCESS_KEY_ID,
                      aws_secret_access_key=AWS_SECRET_ACCESS_KEY, 
                      )

    return s3




def uploadFileToBucket(s3_client, file_obj, bucket, folder, object_name=None):
    """Upload a file to an S3 bucket

    :param file_obj: File to upload
    :param bucket: Bucket to upload to
    :param folder: Folder to upload to
    :param object_name: S3 object name. If not specified then file_name is used
    :return: True if file was uploaded, else False
    """
    # If S3 object_name was not specified, use file_name
    if object_name is None:
        object_name = file_obj

    # Upload the file
    try:
        response = s3_client.upload_fileobj(file_obj, bucket, f"{folder}/{object_name}")
    except ClientError as e:
        logger.error(e)
        return False
    return True

def createFileOnBucket(s3_client: BaseClient, data, bucket, folder, object_name):
    """Create a file on an S3 bucket

    :param bucket: Bucket to upload to
    :param folder: Folder to upload to
    :param object_name: S3 object name. If not specified then file_name is used
    :return: True if file was uploaded, else False
    """

    binary_data = data.encode('utf-8')
    # Upload the file
    try:
        response = s3_client.put_object(Body=binary_data, Bucket=bucket, Key=f"{folder}/{object_name}")
    except ClientError as e:
        logger.error(e)
        return False
    return True

def listFilesInBucket(s3_client: BaseClient, bucket, folder):
    """List files in an S3 bucket

    :param bucket: Bucket to list
    :param folder: Folder to list
    :return: List of files in the bucket. If error, return None
    """
    try:
        response = s3_client.list_objects_v2(Bucket=bucket, Prefix=folder)
    except ClientError as e:
        logger.error(e)
        return None

    files = []
    for obj in response.get('Contents', []):
        files.append(obj)

    return files

def downloadFileFromBucket(s3_client: BaseClient, bucket, folder, object_name):
    """Download a file from an S3 bucket

    :param bucket: Bucket to download from
    :param folder: Folder to download from
    :param object_name: S3 object name
    :return: True if file was downloaded, else False
    """
    try:
        response = s3_client.get_object(Bucket=bucket, Key=f"{folder}/{object_name}")

        data = response['Body'].read()

        encoding = chardet.detect(data)
        logger.info(encoding)

        return data.decode(encoding['encoding'] if encoding['encoding'] is not None else 'ISO-8859-1')

    except ClientError as e:
        logger.error(e)
        return None
    