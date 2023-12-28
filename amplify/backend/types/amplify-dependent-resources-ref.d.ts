export type AmplifyDependentResourcesAttributes = {
  "api": {
    "testzone": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string",
      "GraphQLAPIKeyOutput": "string"
    }
  },
  "auth": {
    "testzone": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    },
    "userPoolGroups": {
      "adminsGroupRole": "string",
      "managersGroupRole": "string",
      "testersGroupRole": "string"
    }
  },
  "storage": {
    "testzone": {
      "BucketName": "string",
      "Region": "string"
    }
  }
}