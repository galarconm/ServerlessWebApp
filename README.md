# ServerlessWebApp
A Serverless Web Application using AWS Lambda, Amazon S3, CloudFront, DynamoDB, SNS, and API Gateway. This project demonstrates best practices for serverless architecture, offering a scalable, cost-effective, and efficient web application solution without traditional servers.


# Automated Cloud Infrastructure with CloudFormation: Three-Tier Web Application

This repository contains a CloudFormation YAML template to deploy a three-tier web application architecture in AWS. 

## Features
- **Serverless Backend**: Built with AWS Lambda and API Gateway.
- **Static Website Hosting**: Hosted on Amazon S3 with global delivery via CloudFront.
- **Database Integration:** Amazon DynamoDB for fast and reliable NoSQL data storage.
- **Highly Scalable**: Automatic handling of varying traffic loads.
- **Cost-Efficient**: Pay only for what you use, thanks to AWS's pay-as-you-go model.
- **Secure**: Enforced HTTPS using CloudFront.

## File Structure

- **frontend/**: Contains the HTML, CSS, and JavaScript files for the user interface.
- **backend/**: Python scripts for AWS Lambda functions.
- **assets/**: Images and static files.
- **docs/**: Supporting documentation (e.g., resumes).

## How to Use
1. Clone the Repository
2. Frontend Deployment:
   - Upload files in the /frontend folder (HTML, CSS, JS) to an S3 bucket
   - Enable static website hosting for the bucket.
   - Set up CloudFront to distribute the content.
3. Backend Deployment:
   - Create AWS Lambda functions for backend logic.
   - Use API Gateway to configure API endpoints
4. Database Setup:
   - Create a DynamoDB table named Projects.
   - Configure table schema to store project details.
5. Update Configuration:
   - Update API Gateway URLs in script.js or frontend files.
   - Ensure IAM permissions are configured for Lambda and DynamoDB access.

## Prerequisites
- AWS account with permissions for CloudFormation, EC2, RDS, and related services.

## Architecture Diagram
![Serverless Web App Diagram](assets/ServerlessWebApp2.png)

## License
This project is licensed under the MIT License. See `LICENSE` for details.
