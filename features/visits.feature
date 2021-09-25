@ct-api
@auth-server
Feature: Visits

  @cleanEstablishments
  @cleanOwners
  @cleanUsers
  @cleanVisits
  Scenario: Create a valid visit
    Given the owner with email "owner_e2e_30@gmail.com" and password "owner30" was created
    And the establishment called "wunderbar2" has characteristics:
      | type    | restaurant          |
      | name    | Wunderbar           |
      | address | Cabildo 1010        |
      | city    | CABA                |
      | state   | CABA                |
      | zip     | 1430ACV             |
      | country | Argentina           |
    And "wunderbar2" has a space with characteristics:
      | name                   | Primer piso |
      | hasExit                | true        |
      | m2                     | 10          |
      | estimatedVisitDuration | 60          |
      | openPlace              | false       |
      | n95Mandatory           | false       |
    And the owner with email "owner_e2e_30@gmail.com" owns the establishment "wunderbar2"
    And the user with email "testing30@gmail.com", DNI "40404040" and password "pass1234" was created
    And the user log in with email "testing30@gmail.com" and password "pass1234"
    And we generate a genux token for "testing30@gmail.com"
    When the establishment "wunderbar2" is created
    And the user with email "testing30@gmail.com" visits the space from establishment "wunderbar2"
    Then the status code for the visit of the user with email "testing30@gmail.com" is 201
