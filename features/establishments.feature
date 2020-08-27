@ct-api
Feature: Establishments

  Scenario: Create a valid establishment
    Given the system is up and running
    And the establishment called "mc_donalds" characteristics:
      | type    | restaurant          |
      | name    | Mc Donalds          |
      | email   | mcdonalds@gmail.com |
      | address | Cabildo 1010        |
      | city    | CABA                |
      | state   | CABA                |
      | zip     | 1430ACV             |
      | country | Argentina           |
    And "mc_donalds" has a space with characteristics:
      | name                   | Primer piso |
      | hasExit                | false       |
      | m2                     | 1000        |
      | estimatedVisitDuration | 60          |
      | openPlace              | false       |
    When the establishment "mc_donalds" is created
    Then the system has the establishment "mc_donalds"
    And the system has 1 spaces for the establishment "mc_donalds"
