

<!-- TABLE OF CONTENTS -->

### Prerequisites

This component uses the [Serverless Framework](https://serverless.com/framework/) to create a webhook endpoint.

You will need to install Serverless Framework via; 

```bash
npm install serverless -g
```

[AWS CLI](https://aws.amazon.com/cli/) is required if you plan on testing within your own AWS account.

### About this Component

This is a testing component that can be used to broadcast messages into the eventbus via http post.

Messages will be sent to the topic indicated by the EVENT_SOURCE environment variable.

Endpoints:

    * POST /:detail-type
        This endpoint will send a message to the topic set by the EVENT_SOURCE with the detail-type set to the `detail-type` parameter.
    * GET /info
        This endpoint can be used to test the webhook is active. 

Responses: 
  
    * 200 OK
        The message was sent successfully.    
    * 500 Internal Server Error
        The message was not sent. Details in the message body.

JSON Payload:

`{
  "status": ok|error,
  "message": details of the error / message location
 }`

### Unit Testing

```bash
yarn test
```
Tests are located in the `__tests__` directory.

#### Offline mode

You can simulate the serverless environment by running in offline mode.

```bash
yarn offline
```

The console output should show where the server is up and running. (Note it won't include the API key requirements)


### Deployment 

Component can be deployed automatically with a merge to master branch. You shouldn't have to use this unless you are deploying to a testing account. 

```bash
serverless deploy --stage development
```


### MetaData from 

```
FigureCaption

NarrativeText

ListItem

Title

Address

Table

PageBreak

Header

Footer

UncategorizedText

Image

Formula

ImageDescription

Transcription
```