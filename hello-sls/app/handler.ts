async function hello(event: any) {
  console.log("Event: ", JSON.stringify(event, null, 2));

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Hello Serverless!',
        input: event,
      },
      null,
      2,
    ),
  };
}

export { hello };
