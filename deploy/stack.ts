import * as cdk from "@aws-cdk/core";
import { LambdaStack } from "deploy/lib/lambda-stack";
import * as pkg from "package.json";

export default class Stack {
  public lambdaStack: LambdaStack;

  constructor(app: cdk.App) {
    this.lambdaStack = new LambdaStack(app, pkg.name, {});
  }
}

const app = new cdk.App();
new Stack(app);