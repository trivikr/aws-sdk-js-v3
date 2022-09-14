const { Given, Then } = require("@cucumber/cucumber");
const { equal } = require("assert");

Given("I create a queue with prefix {string}", async function (prefix) {
  const name = this.uniqueName(prefix);
  const { QueueUrl } = await this.service.createQueue({ QueueName: name });
  this.queueUrl = QueueUrl;
  this.createdQueues.push(QueueUrl);
});

Then("list queues with prefix {string} should return queue urls", async function (prefix) {
  const { QueueUrls } = await this.service.listQueues({ QueueNamePrefix: prefix });
  for (const queueUrl of this.createdQueues) {
    equal(QueueUrls.includes(queueUrl), true);
  }
});
