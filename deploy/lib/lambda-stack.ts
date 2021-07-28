import * as cdk from "@aws-cdk/core";
import { AssetCode, Function, Runtime } from "@aws-cdk/aws-lambda";
import {
  RestApi,
  LambdaIntegration,
  IResource,
  MockIntegration,
  PassthroughBehavior,
  Resource,
} from "@aws-cdk/aws-apigateway";;


interface Props { }


const addCorsOptions = (apiResource: IResource) => {
  apiResource.addMethod(
    "OPTIONS",
    new MockIntegration({
      integrationResponses: [
        {
          statusCode: "200",
          responseParameters: {
            "method.response.header.Access-Control-Allow-Headers":
              "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
            "method.response.header.Access-Control-Allow-Origin": "'*'",
            "method.response.header.Access-Control-Allow-Credentials":
              "'false'",
            "method.response.header.Access-Control-Allow-Methods":
              "'OPTIONS,GET,PUT,POST,DELETE'",
          },
        },
      ],
      passthroughBehavior: PassthroughBehavior.NEVER,
      requestTemplates: {
        "application/json": '{"statusCode": 200}',
      },
    }),
    {
      methodResponses: [
        {
          statusCode: "200",
          responseParameters: {
            "method.response.header.Access-Control-Allow-Headers": true,
            "method.response.header.Access-Control-Allow-Methods": true,
            "method.response.header.Access-Control-Allow-Credentials": true,
            "method.response.header.Access-Control-Allow-Origin": true,
          },
        },
      ],
    }
  );
}

export class LambdaStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, _props: Props) {
    super(scope, id);
    console.log(id)
    const bootstrapLocation = `${__dirname}/../../target/cdk/release`;

    const getCostUsageLambda = new Function(this, "Retrieves cost and usage metrics for your account.", {
      functionName: "get-cost-usage",
      runtime: Runtime.PROVIDED_AL2,
      handler: `${id}`,
      code: new AssetCode(bootstrapLocation)
    });

    const api = new RestApi(this, "AwsCostCheckerServerlessAPI", {
      restApiName: "AwsCostCheckerServerlessAPI",
    });

    const costs: Resource = api.root.addResource("costs")
    costs.addMethod('GET', new LambdaIntegration(getCostUsageLambda));
    addCorsOptions(costs);
  }
}
