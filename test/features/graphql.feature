Feature: GraphQL body parser processing application/graphql requests

  Background:
    Given a webserver with body-parser-graphql middleware

  Scenario: Simple request
    Given a request with Content-Type 'application/graphql'
    And request body:
      """
      { allPosts { id title } }
      """
    When I send the request to the server
    Then it should process the request
    And the Content-Type should be set to 'application/json'
    And the request body should be:
      """
      {
        "query": "{ allPosts { id title } }"
      }
      """

  Scenario: Request using new lines
    Given a request with Content-Type 'application/graphql'
    And request body:
      """
      {
        allPosts {
          id
          title
        }
      }
      """
    When I send the request to the server
    Then it should process the request
    And the Content-Type should be set to 'application/json'
    And the request body should be:
      """
      {
        "query": "{\n  allPosts {\n    id\n    title\n  }\n}"
      }
      """

  Scenario: Request using quotes
    Given a request with Content-Type 'application/graphql'
    And request body:
      """
      {
        allPosts(filter: { title: "Test" }) {
          id
          title
        }
      }
      """
    When I send the request to the server
    Then it should process the request
    And the Content-Type should be set to 'application/json'
    And the request body should be:
      """
      {
        "query": "{\n  allPosts(filter: { title: \"Test\" }) {\n    id\n    title\n  }\n}"
      }
      """