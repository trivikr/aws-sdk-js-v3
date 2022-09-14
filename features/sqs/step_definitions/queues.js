const { Given, Then } = require("@cucumber/cucumber");

Given("I create a queue with prefix {string}", async function (prefix) {
  const name = this.uniqueName(prefix);
  const { QueueUrl } = await this.service.createQueue({ QueueName: name });
  this.queueUrl = QueueUrl;
  this.createdQueues.push(QueueUrl);
});

Then("list queues with prefix {string} should return queue urls", function (prefix, callback) {
  this.eventually(
    callback,
    function (next) {
      next.condition = function () {
        let matchingCount = 0;
        for (let i = 0; i < this.createdQueues.length; ++i) {
          for (let j = 0; j < this.data.QueueUrls.length; ++j) {
            if (this.createdQueues[i] == this.data.QueueUrls[j]) {
              matchingCount++;
            }
          }
        }
        return matchingCount == this.createdQueues.length;
      };

      this.request(null, "listQueues", { QueueNamePrefix: prefix }, next);
    },
    { maxTime: 60 }
  );
});
