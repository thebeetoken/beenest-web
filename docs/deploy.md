# Deploy Setup

## Setup a CodeBuild to upload to S3.

### Dev
``dev01`` branch deploys to ``dev01.beenest.io``
``dev02`` branch deploys to ``dev02.beenest.io``
``dev03`` branch deploys to ``dev03.beenest.io``

### Staging
``master`` branch deploys to ``staging.beenest.io``

Config is defined in `.circleci/config.yml`

### Production
``production`` branch deploys to ``beenest.com``

**Attach S3 write access to the correct bucket for deployer IAM user.**

Edit the TrustPolicy and change to:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "s3:*",
                "logs:*",
                "ssm:GetParameters"
            ],
            "Resource": [
                "arn:aws:s3:::codepipeline-us-west-2-*",
                "arn:aws:s3:::beenest-v2-prod/*",
                "arn:aws:logs:us-west-2:285207190577:log-group:/aws/codebuild/beenest-production-branch",
                "arn:aws:logs:us-west-2:285207190577:log-group:/aws/codebuild/beenest-production-branch:*",
                "arn:aws:ssm:us-west-2:285207190577:parameter/CodeBuild/*"
            ]
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": "cloudfront:CreateInvalidation",
            "Resource": "*"
        }
    ]
}
```

Config is defined in `.circleci/config.yml`

