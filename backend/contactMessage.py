import json
import boto3
import uuid
from datetime import datetime

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('ContactMessages')

def lambda_handler(event, context):
    try:
        # Log the incoming event for debugging
        print("Received event:", json.dumps(event))

        # Check if 'body' is present in the event
        if 'body' not in event:
            raise ValueError("Missing 'body' in event")

        # Parse the incoming data
        body = json.loads(event['body'])

        # Extract form fields
        name = body.get('name')
        email = body.get('email')
        message = body.get("message")

        # Create a unique ID and timestamp
        message_id = str(uuid.uuid4())
        timestamp = str(datetime.now())

        # Store the data in DynamoDB
        table.put_item(
            Item={
                'messageId': message_id,
                'name': name,
                'email': email,
                'message': message,
                'timestamp': timestamp
            }
        )
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps({'message': 'Message sent successfully!'})
        }

    except Exception as e:
        print("Error:", str(e))
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps({'message': 'Internal Server Error', 'error': str(e)})
        }