@auth-server
Feature: Auth Server

  @cleanUsers
  Scenario: Create a new user
    When the user with email "testing@gmail.com" and password "pass1234" is created
    Then the user with email "testing@gmail.com" exists

  @cleanUsers
  Scenario: Sign In with a new user
    When the user with email "testing2@gmail.com" and password "pass1234" is created
    And we sign in with email "testing2@gmail.com" and password "pass1234"
    Then the user with email "testing2@gmail.com" is logged in

  Scenario: Sign In with inexistent user
    Given no user was created
    When we sign in with email "testing3@gmail.com" and password "pass1234"
    Then the user with email "testing3@gmail.com" does not exist

  @cleanUsers
  Scenario: Validate Access Token
    When the user with email "testing4@gmail.com" and password "pass1234" is created
    And we sign in with email "testing4@gmail.com" and password "pass1234"
    And we validate the access token of "testing4@gmail.com"
    Then the access token of "testing4@gmail.com" is valid
