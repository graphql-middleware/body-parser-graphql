Feature: GraphQL body parser processing application/json requests

  Background:
    Given a webserver with body-parser-graphql middleware

  Scenario: Simple request
    Given a request with Content-Type 'application/json'
    And request body:
      """
      { 
        "query": "{ allPosts { id title } }"
      }
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

