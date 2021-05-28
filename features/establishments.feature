@ct-api
Feature: Establishments

  @cleanEstablishments
  Scenario: Create a valid establishment
    Given the establishment called "mc_donalds" has characteristics:
      | type    | restaurant          |
      | name    | Mc Donalds          |
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
      | n95Mandatory           | false       |
    When the establishment "mc_donalds" is created
    Then the status code for establishment "mc_donalds" creation is 201
    And the system has the establishment "mc_donalds"
    And the system has 1 spaces for the establishment "mc_donalds"

  @cleanEstablishments
  Scenario: Create an invalid establishment
    Given the establishment called "burger_king" has characteristics:
      | type    | restaurant          |
      | name    | Burger King         |
      | zip     | 1430ACV             |
      | country | Argentina           |
    And "burger_king" has a space with characteristics:
      | name                   | Primer piso |
      | hasExit                | false       |
      | m2                     | 1000        |
      | estimatedVisitDuration | 60          |
      | openPlace              | false       |
      | n95Mandatory           | false       |
    When the establishment "burger_king" is created
    Then the status code for establishment "burger_king" creation is 401
    And the system does not have the establishment "burger_king"

  @cleanEstablishments
  Scenario: Create a valid establishment with 0 spaces
    Given the establishment called "mostaza" has characteristics:
      | type    | restaurant          |
      | name    | Mostaza             |
      | address | Cabildo 1010        |
      | city    | CABA                |
      | state   | CABA                |
      | zip     | 1430ACV             |
      | country | Argentina           |
    When the establishment "mostaza" is created
    Then the status code for establishment "mostaza" creation is 401
    And the system does not have the establishment "mostaza"

  @cleanEstablishments
  Scenario: Create a valid establishment with 2 spaces
    Given the establishment called "wunderbar" has characteristics:
      | type    | restaurant          |
      | name    | Wunderbar           |
      | address | Cabildo 1010        |
      | city    | CABA                |
      | state   | CABA                |
      | zip     | 1430ACV             |
      | country | Argentina           |
    And "wunderbar" has a space with characteristics:
      | name                   | Primer piso |
      | hasExit                | false       |
      | m2                     | 1000        |
      | estimatedVisitDuration | 60          |
      | openPlace              | false       |
      | n95Mandatory           | false       |
    And "wunderbar" has a space with characteristics:
      | name                   | Segundo piso |
      | hasExit                | false        |
      | m2                     | 500          |
      | estimatedVisitDuration | 45           |
      | openPlace              | true         |
      | n95Mandatory           | false        |
    When the establishment "wunderbar" is created
    Then the status code for establishment "wunderbar" creation is 201
    And the system has the establishment "wunderbar"
    And the system has 2 spaces for the establishment "wunderbar"

  @cleanEstablishments
  Scenario: Create two valid establishments
    Given the establishment called "mc_donalds" has characteristics:
      | type    | restaurant          |
      | name    | Mc Donalds          |
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
      | n95Mandatory           | false       |
    And the establishment called "wunderbar" has characteristics:
      | type    | restaurant          |
      | name    | Wunderbar           |
      | address | Cabildo 1010        |
      | city    | CABA                |
      | state   | CABA                |
      | zip     | 1430ACV             |
      | country | Argentina           |
    And "wunderbar" has a space with characteristics:
      | name                   | Primer piso |
      | hasExit                | false       |
      | m2                     | 1000        |
      | estimatedVisitDuration | 60          |
      | openPlace              | false       |
      | n95Mandatory           | false       |
    When the establishment "mc_donalds" is created
    And the establishment "wunderbar" is created
    Then the status code for establishment "mc_donalds" creation is 201
    And the system has the establishment "mc_donalds"
    And the system has 1 spaces for the establishment "mc_donalds"
    And the status code for establishment "wunderbar" creation is 201
    And the system has the establishment "wunderbar"
    And the system has 1 spaces for the establishment "wunderbar"

  @cleanEstablishments
  Scenario: Create a PDF from a valid establishment
    Given the establishment "mc_donalds" with a space exists
    When the PDF for the establishment "mc_donalds" is requested
    And the status code for the PDF generation for "mc_donalds" is 200
    And the response for the PDF generation for "mc_donalds" has type application pdf
    And the response for the PDF generation for "mc_donalds" has an attachment

  @cleanEstablishments
  Scenario: Create a PDF from a invalid establishment
    Given the establishment called "burger_king" has characteristics:
      | type    | restaurant          |
      | name    | Burger King         |
      | zip     | 1430ACV             |
      | country | Argentina           |
    And "burger_king" has a space with characteristics:
      | name                   | Primer piso |
      | hasExit                | false       |
      | m2                     | 1000        |
      | estimatedVisitDuration | 60          |
      | openPlace              | false       |
      | n95Mandatory           | false       |
    When the establishment "burger_king" is created
    And the PDF for the establishment "burger_king" is requested
    Then the status code for establishment "burger_king" creation is 401
    And the status code for the PDF generation for "burger_king" is 400
