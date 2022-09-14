const { Given, Then } = require("@cucumber/cucumber");
const { equal } = require("assert");

Given("I create a queue with prefix {string}", async function (prefix) {
  const name = this.uniqueName(prefix);
  const { QueueUrl } = await this.service.createQueue({ QueueName: name });
  this.queueUrl = QueueUrl;
  this.createdQueues.push(QueueUrl);

  // After you create a queue, you must wait at least one second after the queue
  // is created to be able to use the queue.
  // https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_CreateQueue.html
  await new Promise((resolve) => setTimeout(resolve, 1000));
});

Then("list queues with prefix {string} should return queue urls", async function (prefix) {
  const { QueueUrls } = await this.service.listQueues({ QueueNamePrefix: prefix });
  for (const queueUrl of this.createdQueues) {
    equal(QueueUrls.includes(queueUrl), true);
  }
});
