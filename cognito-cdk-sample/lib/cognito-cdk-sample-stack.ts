import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import * as cognito from "aws-cdk-lib/aws-cognito";

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CognitoCdkSampleStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const userPool = new cognito.UserPool(this, 'userPool', {
            userPoolName: 'catalog-service-user-pool'
        });

        // 👇 create an Output
        new cdk.CfnOutput(this, 'GreetingsQueueArn', {
            value: userPool.userPoolProviderUrl,
            description: 'The Url of the user pool'
        });

    }
}
