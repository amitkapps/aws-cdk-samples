import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import * as cognito from "aws-cdk-lib/aws-cognito";

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CognitoCdkSampleStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const userPool = new cognito.UserPool(this, 'userPool', {
            userPoolName: 'product-service-user-pool'
        });

        //Add a domain prefix for the url that is generated for the pool
        new cognito.UserPoolDomain(this, 'userPoolDomain', {
            userPool: userPool,
            cognitoDomain: {domainPrefix: 'product-service'}
        });

        const addProductScope = new cognito.ResourceServerScope({scopeName: "catalog-service:add-product", scopeDescription: "Add new products to the catalog"});
        const listProductScope = new cognito.ResourceServerScope({scopeName: "catalog-service:list-product", scopeDescription: "Allows listing all products from the catalog"});

        const catalogResourceServer = userPool.addResourceServer('CatalogResourceServer', {
            identifier: 'catalog-resource-server',
            scopes: [addProductScope, listProductScope]
        });


        //Suggest to keep this out of the stack, let this be generated through the console or better still:
        //build this into a custom UI to handle adding/removing clients
        const userPoolClient = userPool.addClient('catalog-service-client', {
            authFlows: {userPassword: true},
            generateSecret: true,
            preventUserExistenceErrors: false,
            userPoolClientName: 'catalog-service-client',
            oAuth: {
                flows: {clientCredentials: true},
                scopes: [ cognito.OAuthScope.resourceServer(catalogResourceServer, addProductScope),
                          cognito.OAuthScope.resourceServer(catalogResourceServer, listProductScope) ]
            }
        });

        // Create an Output
        new cdk.CfnOutput(this, 'UserPoolUrl', {
            value: userPool.userPoolProviderUrl,
            description: 'The Url of the user pool'
        });
        new cdk.CfnOutput(this, 'UserPoolId', {
            value: userPool.userPoolId,
            description: 'The User pool id'
        });
        new cdk.CfnOutput(this, 'UserPoolClientId', {
            value: userPoolClient.userPoolClientId,
            description: 'The User pool client id'
        });
        new cdk.CfnOutput(this, 'UserPoolClientSecret', {
            value: userPoolClient.userPoolClientSecret.unsafeUnwrap(),
            description: 'The User pool client secret'
        });

    }
}
