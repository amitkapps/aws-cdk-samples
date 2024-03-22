# Overview
This sample uses CDK to stand up a cognito user pool
## Use cases
1. service to service authentication

# Scaffolding
1. `npx cdk init app --language typescript`

# Build & deploy
1. Verify cdk is syntactically correct and generates the cloudformation 
2. `npx cdk synth`
3. deploy to the aws account
4. `npx cdk deploy --profile <aws profile>`
5. This should list the userpool url and the user pool id in the console output
6. It should also show the user pool client-id and the client-secret

# Test
1. Check if the userpool is able to list the resource server we created
2. `aws cognito-idp list-resource-servers --user-pool-id <user pool id from cdk> --profile <aws profile> --output json --max-results 10`
3. Get the token from the oauth2 endpoint of the cognito pool
4. ```shell
    curl --location --request POST 'https://product-service.auth.us-west-2.amazoncognito.com/oauth2/token?client_id=<client-id from cdk output>&grant_type=client_credentials' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    -u <client-id>:<client-secret>
   ```
5. This should respond with an access token
   1. ```json
      {"access_token": "<jwt-header base64>.<payload base64>.<signature base64>",
      "expires_in":3600,
      "token_type": "Bearer"
      }
      ```
   2. inspect the above access_token on jwt.io and see the scopes returned - it should have both the 2 scopes added in the cdk for this client.