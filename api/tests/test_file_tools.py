
import datetime
from dateutil.tz import tzutc

from discontinuity_api.tools.files import ListWorkspaceFiles

import logging
logger = logging.getLogger(__name__)



def test_file_filter_parser():
    files = [{'Key': 'clvr1labs0000144f2oli5rlx/10089434.pdf', 'LastModified': datetime.datetime(2024, 5, 3, 19, 2, 57, tzinfo=tzutc()), 'ETag': '"8246253beac037bf2a00afe0f26eed85"', 'Size': 27103, 'StorageClass': 'STANDARD'},
              {'Key': 'clvr1labs0000144f2oli5rlx/10247517.png', 'LastModified': datetime.datetime(2024, 5, 3, 19, 2, 57, tzinfo=tzutc()), 'ETag': '"3f687480e9f18a0da0b142c2e8258799"', 'Size': 25304, 'StorageClass': 'STANDARD'}, 
              {'Key': 'clvr1labs0000144f2oli5rlx/10265057.pdf', 'LastModified': datetime.datetime(2024, 5, 3, 19, 2, 57, tzinfo=tzutc()), 'ETag': '"c7b335442a9f1213d72acad04078728e"', 'Size': 20247, 'StorageClass': 'STANDARD'}, 
              {'Key': 'clvr1labs0000144f2oli5rlx/10553553.jpeg', 'LastModified': datetime.datetime(2024, 5, 3, 19, 2, 57, tzinfo=tzutc()), 'ETag': '"c2eeea016043b66766819c11207b3d7c"', 'Size': 24212, 'StorageClass': 'STANDARD'},
              {'Key': 'clvr1labs0000144f2oli5rlx/10641230.ods', 'LastModified': datetime.datetime(2024, 5, 3, 19, 2, 57, tzinfo=tzutc()), 'ETag': '"3ff9f37577d7a9d72f9a054591450c18"', 'Size': 21543, 'StorageClass': 'STANDARD'},
              {'Key': 'clvr1labs0000144f2oli5rlx/10839851.doc', 'LastModified': datetime.datetime(2024, 5, 3, 19, 2, 57, tzinfo=tzutc()), 'ETag': '"68596090876c6b12147cd818c1bcdb33"', 'Size': 21180, 'StorageClass': 'STANDARD'}]

    tool = ListWorkspaceFiles(workspaceId="clvr1labs0000144f2oli5rlx")

    filtered_files = tool._apply_filter(files, ["pdf"])

    assert len(filtered_files) == 2

    filtered_files = tool._apply_filter(files, ["xls","xlsx"])

    assert len(filtered_files) == 0


def test_tool_run():

    tool = ListWorkspaceFiles(workspaceId="clvr1labs0000144f2oli5rlx")

    result = tool.run(tool_input="tool",filter="pdf")

    logger.info(result)

    assert result is not None
    assert result != "No files found in workspace"

    assert result["context"] is not None
    assert len(result["context"]) > 2

def test_tool_run_images():

    tool = ListWorkspaceFiles(workspaceId="clvr1labs0000144f2oli5rlx")

    result = tool.run(tool_input="tool",filter="images")

    logger.info(result)

    assert result is not None
    assert result != "No files found in workspace"

    assert result["context"] is not None
    assert len(result["context"]) > 0