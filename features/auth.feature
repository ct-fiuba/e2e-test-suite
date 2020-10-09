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

  @cleanUsers
  Scenario: Refresh Access Token
    When the user with email "testing5@gmail.com" and password "pass1234" is created
    And we sign in with email "testing5@gmail.com" and password "pass1234"
    And we refresh the access token of "testing5@gmail.com"
    And we validate the access token of "testing5@gmail.com"
    Then the access token of "testing5@gmail.com" is refreshed
    And the access token of "testing5@gmail.com" is valid
    And the access token of "testing5@gmail.com" is different from the original one

  @cleanUsers
  Scenario: Generate Genux Token
    When the user with email "testing6@gmail.com" and password "pass1234" is created
    And we sign in with email "testing6@gmail.com" and password "pass1234"
    And we generate a genux token for "testing6@gmail.com"
    Then the genux token for "testing6@gmail.com" is created

  @cleanUsers
  Scenario: Use Genux Token
    When the user with email "testing7@gmail.com" and password "pass1234" is created
    And we sign in with email "testing7@gmail.com" and password "pass1234"
    And we generate a genux token for "testing7@gmail.com"
    And we use the genux token for "testing7@gmail.com"
    Then the genux token for "testing7@gmail.com" is used correctly

  @cleanUsers
  Scenario: Use Genux Token twice
    When the user with email "testing8@gmail.com" and password "pass1234" is created
    And we sign in with email "testing8@gmail.com" and password "pass1234"
    And we generate a genux token for "testing8@gmail.com"
    And we use the genux token for "testing8@gmail.com"
    And we use the genux token for "testing8@gmail.com"
    Then the genux token for "testing8@gmail.com" is not used correctly
