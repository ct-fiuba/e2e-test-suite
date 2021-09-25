@auth-server
Feature: Auth Server

  @cleanUsers
  Scenario: Create a new user
    When the user with email "testing@gmail.com", DNI "40404040" and password "pass1234" is created
    Then the user "signUp" of "testing@gmail.com" resulted in "success"

  @cleanOwners
  Scenario: Create a new owner
    When the owner with email "owner_e2e_1@gmail.com" and password "owner1" is created
    Then the owner "signUp" of "owner_e2e_1@gmail.com" resulted in "success"

  @cleanUsers
  Scenario: Log In with a new user
    Given the user with email "testing2@gmail.com", DNI "40404040" and password "pass1234" was created
    When the user log in with email "testing2@gmail.com" and password "pass1234"
    Then the user "logIn" of "testing2@gmail.com" resulted in "success"

  Scenario: Log In with inexistent user
    When the user log in with email "testing3@gmail.com" and password "pass1234"
    Then the user "logIn" of "testing3@gmail.com" resulted in "failure"

  @cleanOwners
  Scenario: Log In with a new owner
    Given the owner with email "owner_e2e_2@gmail.com" and password "pass1234" was created
    When the owner log in with email "owner_e2e_2@gmail.com" and password "pass1234"
    Then the owner "logIn" of "owner_e2e_2@gmail.com" resulted in "success"

  Scenario: Log In with inexistent owner
    When the owner log in with email "owner_e2e_3@gmail.com" and password "pass1234"
    Then the owner "logIn" of "owner_e2e_3@gmail.com" resulted in "failure"

  @cleanUsers
  Scenario: User validate users Access Token
    Given the user with email "testing4@gmail.com", DNI "40404040" and password "pass1234" was created
    And the user log in with email "testing4@gmail.com" and password "pass1234"
    When we validate the user access token of "testing4@gmail.com"
    Then the user "validateAccessToken" of "testing4@gmail.com" resulted in "success"

  @cleanUsers
  Scenario: User validate owners Access Token
    Given the user with email "testing41@gmail.com", DNI "40404040" and password "pass1234" was created
    And the user log in with email "testing41@gmail.com" and password "pass1234"
    When we validate the user access token of "testing41@gmail.com" as an owner access token
    Then the user "validateAccessToken" of "testing41@gmail.com" resulted in "failure"

  @cleanOwners
  Scenario: Owner validate owners Access Token
    Given the owner with email "owner_e2e_3@gmail.com" and password "pass1234" was created
    And the owner log in with email "owner_e2e_3@gmail.com" and password "pass1234"
    When we validate the owner access token of "owner_e2e_3@gmail.com"
    Then the owner "validateAccessToken" of "owner_e2e_3@gmail.com" resulted in "success"

  @cleanOwners
  Scenario: Owner validate users Access Token
   Given the owner with email "owner_e2e_4@gmail.com" and password "pass1234" was created
    And the owner log in with email "owner_e2e_4@gmail.com" and password "pass1234"
    When we validate the owner access token of "owner_e2e_4@gmail.com" as a user access token
    Then the owner "validateAccessToken" of "owner_e2e_4@gmail.com" resulted in "failure"

  @cleanUsers
  Scenario: Refresh Access Token
    Given the user with email "testing5@gmail.com", DNI "40404040" and password "pass1234" was created
    And the user log in with email "testing5@gmail.com" and password "pass1234"
    When we refresh the user access token of "testing5@gmail.com"
    And we validate the user access token of "testing5@gmail.com"
    Then the user "refreshToken" of "testing5@gmail.com" resulted in "success"
    And the user "validateAccessToken" of "testing5@gmail.com" resulted in "success"
    And the access token of user "testing5@gmail.com" is different from the original one

  @cleanUsers
  Scenario: Generate Genux Token
    Given the user with email "testing6@gmail.com", DNI "40404040" and password "pass1234" was created
    And the user log in with email "testing6@gmail.com" and password "pass1234"
    When we generate a genux token for "testing6@gmail.com"
    Then the user "generateGenuxToken" of "testing6@gmail.com" resulted in "success"

  @cleanUsers
  Scenario: Use Genux Token
    Given the user with email "testing7@gmail.com", DNI "40404040" and password "pass1234" was created
    And the user log in with email "testing7@gmail.com" and password "pass1234"
    And we generate a genux token for "testing7@gmail.com"
    When we use the genux token for "testing7@gmail.com"
    Then the user "useGenuxToken" of "testing7@gmail.com" resulted in "success"

  @cleanUsers
  Scenario: Use Genux Token twice
    Given the user with email "testing8@gmail.com", DNI "40404040" and password "pass1234" was created
    And the user log in with email "testing8@gmail.com" and password "pass1234"
    And we generate a genux token for "testing8@gmail.com"
    When we use the genux token for "testing8@gmail.com"
    And we use the genux token for "testing8@gmail.com"
    Then the user "useGenuxToken" of "testing8@gmail.com" resulted in "failure"

  @cleanAdmins
  Scenario: Log In with admin user
    When the admin logs in
    Then the admin "logIn" resulted in "success"
