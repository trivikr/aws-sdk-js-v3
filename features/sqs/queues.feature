# language: en
@sqs @queues
Feature: SQS Queues

  I want to be able to create, list and delete queues.

  Scenario: Creating and deleting queues
    Given I create a queue with prefix "aws-js-sdk"
    And I create a queue with prefix "aws-js-sdk"
    Then list queues with prefix "aws-js-sdk" should return queue urls
