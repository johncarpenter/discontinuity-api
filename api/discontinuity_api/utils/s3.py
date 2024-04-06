import boto3
from botocore.client import BaseClient
import os
import logging
from botocore.exceptions import ClientError

AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")

def s3Client() -> BaseClient:
    s3 = boto3.client(service_name='s3', aws_access_key_id=AWS_SECRET_ACCESS_KEY,
                      aws_secret_access_key=AWS_ACCESS_KEY_ID, 
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
        logging.error(e)
        return False
    return True