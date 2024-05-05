import os
from discontinuity_api.utils.s3 import listFilesInBucket, s3Client


def test_list_s3_bucket():
    
    files = listFilesInBucket(s3_client=s3Client(),bucket=os.getenv('AWS_BUCKET_NAME'), folder="")
    
    print(files)
    assert len(files) > 0