@auth-server
Feature: Auth Server

  @cleanUsers
  Scenario: Create a new user
    When the user with email "testing@gmail.com" and password "pass1234" is created
    Then the "signUp" of "testing@gmail.com" resulted in 200

  @cleanUsers
  Scenario: Sign In with a new user
    When the user with email "testing2@gmail.com" and password "pass1234" is created
    And we sign in with email "testing2@gmail.com" and password "pass1234"
    Then the "signIn" of "testing2@gmail.com" resulted in 200


  Scenario: Sign In with inexistent user
    When we sign in with email "testing3@gmail.com" and password "pass1234"
    Then the "signIn" of "testing3@gmail.com" resulted in 400

  @cleanUsers
  Scenario: Validate Access Token
    When the user with email "testing4@gmail.com" and password "pass1234" is created
    And we sign in with email "testing4@gmail.com" and password "pass1234"
    And we validate the access token of "testing4@gmail.com"
    And the "validateAccessToken" of "testing4@gmail.com" resulted in 200

  @cleanUsers
  Scenario: Refresh Access Token
    When the user with email "testing5@gmail.com" and password "pass1234" is created
    And we sign in with email "testing5@gmail.com" and password "pass1234"
    And we refresh the access token of "testing5@gmail.com"
    And we validate the access token of "testing5@gmail.com"
    Then the "refreshToken" of "testing5@gmail.com" resulted in 200
    And the "validateAccessToken" of "testing5@gmail.com" resulted in 200
    And the access token of "testing5@gmail.com" is different from the original one

  @cleanUsers
  Scenario: Generate Genux Token
    When the user with email "testing6@gmail.com" and password "pass1234" is created
    And we sign in with email "testing6@gmail.com" and password "pass1234"
    And we generate a genux token for "testing6@gmail.com"
    Then the "generateGenuxToken" of "testing6@gmail.com" resulted in 200

  @cleanUsers
  Scenario: Use Genux Token
    When the user with email "testing7@gmail.com" and password "pass1234" is created
    And we sign in with email "testing7@gmail.com" and password "pass1234"
    And we generate a genux token for "testing7@gmail.com"
    And we use the genux token for "testing7@gmail.com"
    Then the "useGenuxToken" of "testing7@gmail.com" resulted in 204

  @cleanUsers
  Scenario: Use Genux Token twice
    When the user with email "testing8@gmail.com" and password "pass1234" is created
    And we sign in with email "testing8@gmail.com" and password "pass1234"
    And we generate a genux token for "testing8@gmail.com"
    And we use the genux token for "testing8@gmail.com"
    And we use the genux token for "testing8@gmail.com"
    Then the "useGenuxToken" of "testing8@gmail.com" resulted in 400
