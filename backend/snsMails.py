import json
import boto3

# Create an SNS client
sns = boto3.client('sns')

def lambda_handler(event, context):
    # Iterate over each record in the event
    for record in event['Records']:
        # Check if the event is an INSERT event
        if record['eventName'] == 'INSERT':
            # Extract the new image (newly added item) from the DynamoDB stream
            new_image = record['dynamodb']['NewImage']
            
            # Extract relevant data from the new image
            name = new_image['name']['S']
            email = new_image['email']['S']
            message = new_image['message']['S']

            # Structure the message to be sent
            sns_message = f"""
            New message arrived:
            --------------------------------------
            Name: {name}
            Email: {email}
            Message: {message}
            """
            # Publish the message to the SNS topic
            response = sns.publish(
                TopicArn='arn:aws:sns:us-east-1:654654193269:contactme',
                Message=sns_message,
                Subject='New message of contact form'
            )
    
    return {
        'statusCode': 200,
        'body': json.dumps('SNS message sent successfully!')
    }