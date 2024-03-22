# Overview
An API gateway created from an OpenAPI specification

# Design
1. API Gateway setup with the open api specification file which declares a GET /products/{productId}
2. The API Spec is configured with aws api gateway extension to provide a MOCK integration
   1. This returns a 404 response for productId 9999 and a sample product for all other productId path variable

# Build & Deploy
1. `npx cdk synth --profile <aws profile>`
2. Deploy will output the api gateway url
3. `npx cdk deploy --profile <aws profile>`

# Test
1. Per the mock integration, when supplying productId 9999, it'll respond with an http 404
2. `curl --request GET <api gateway url>/prod/products/9999`
3. `curl --request GET <api gateway url>/prod/products/1000`