@ct-api
Feature: Establishments

  Scenario: Create a valid establishment
    Given the system is up and running
    And the establishment called "EJEMPLO" characteristics:
      | type    | restaurant          |
      | name    | Mc Donalds          |
      | email   | mcdonalds@gmail.com |
      | address | Cabildo 1010        |
      | city    | CABA                |
      | state   | CABA                |
      | zip     | 1430ACV             |
      | country | Argentina           |
    And "EJEMPLO" has a space with characteristics:
      | name                   | Primer piso |
      | hasExit                | false       |
      | m2                     | 1000        |
      | estimatedVisitDuration | 60          |
      | openPlace              | false       |
    When the establishment "EJEMPLO" is created
    Then the response is successful
    And the system has the establishment "EJEMPLO"
