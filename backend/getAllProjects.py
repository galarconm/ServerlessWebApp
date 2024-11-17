import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Projects')

def lambda_handler(event, context):
    try:
        # Scan DynamoDB table
        response = table.scan()
        items = response['Items']
        
        # Process items to remove DynamoDB type information
        processed_items = []
        for item in items:
            processed_item = {
                "projectId": item.get("projectId", "N/A"),
                "title": item.get("title", "N/A"),
                "overview": item.get("overview", "N/A"),
                "features": item.get("features", "N/A"),
                "keyTechnologies": item.get("keyTechnologies", "N/A"),
                "imageURL": item.get("imageURL", "N/A"), # Add imageURL to the response
                "lessonLearned": item.get("lessonLearned", "N/A"),
                "date": item.get("date", "N/A"),
                # Convert relevance to int or float
                "relevance": convert_string2int(item.get("relevance", "N/A"))
            }
            processed_items.append(processed_item)
        
        return {
            'statusCode': 200,
            'body': json.dumps(processed_items)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Internal Server Error', 'error': str(e)})
        }
    
    # Helper function to convert string to int or float
def convert_string2int(value):
    try:
        return int(value)
    except ValueError:
        return value
