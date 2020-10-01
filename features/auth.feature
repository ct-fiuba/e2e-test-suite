@auth-server
Feature: Auth Server

  @cleanUsers
  Scenario: Create a new user
    Given the auth server is up and running
    When the user with email "testing@gmail.com" and password "pass1234" is created
    Then the user with email "testing@gmail.com" is created

  @cleanUsers
  Scenario: Sign In with a new user
    Given the auth server is up and running
    When the user with email "testing2@gmail.com" and password "pass1234" is created
    And we sign in with with email "testing2@gmail.com" and password "pass1234" is created
    Then the user with email "testing2@gmail.com" is logged in
