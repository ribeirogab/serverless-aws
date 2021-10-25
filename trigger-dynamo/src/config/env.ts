type EnvVariables = {
  dynamodbTable: string;
};

export const env: EnvVariables = {
  dynamodbTable: process.env.DYNAMODB_TABLE || '',
};
