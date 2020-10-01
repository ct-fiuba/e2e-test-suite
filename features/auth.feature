@auth-server
Feature: Auth Server

  Scenario: Create a new user
    Given the auth server is up and running
    When the user with email "testing@gmail.com" and password "pass1234" is created
    Then the user with email "testing@gmail.com" is created
