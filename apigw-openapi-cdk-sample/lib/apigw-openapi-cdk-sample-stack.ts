import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigw from 'aws-cdk-lib/aws-apigateway';

export class ApigwOpenapiCdkSampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const inventoryApi = new apigw.SpecRestApi(this, 'product-catalog-api', {
      apiDefinition: apigw.ApiDefinition.fromAsset('./oas-spec/product-service-oas-3.0.yml'),
      endpointTypes: [apigw.EndpointType.REGIONAL]
    });

    // Create an Output
    new cdk.CfnOutput(this, 'ApiGatewayUrl', {
      value: inventoryApi.url,
      description: 'The API Gateway URL'
    });

    // The code that defines your stack goes here
  }
}
