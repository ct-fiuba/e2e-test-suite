@ct-api
@auth-server
Feature: Establishments

  @cleanEstablishments
  @cleanOwners
  Scenario: Create a valid establishment
    Given the owner with email "owner_e2e_2@gmail.com" and password "owner2" was created
    And the establishment called "mc_donalds" has characteristics:
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
      | openSpace              | false       |
      | n95Mandatory           | false       |
    And the owner with email "owner_e2e_2@gmail.com" owns the establishment "mc_donalds"
    When the establishment "mc_donalds" is created
    Then the status code for establishment "mc_donalds" creation is 201
    And the system has the establishment "mc_donalds"
    And the system has 1 spaces for the establishment "mc_donalds"

  @cleanEstablishments
  @cleanOwners
  Scenario: Create an invalid establishment
    Given the owner with email "owner_e2e_3@gmail.com" and password "owner3" was created
    And the establishment called "burger_king" has characteristics:
      | type    | restaurant          |
      | name    | Burger King         |
      | zip     | 1430ACV             |
      | country | Argentina           |
    And "burger_king" has a space with characteristics:
      | name                   | Primer piso |
      | hasExit                | false       |
      | m2                     | 1000        |
      | estimatedVisitDuration | 60          |
      | openSpace              | false       |
      | n95Mandatory           | false       |
    And the owner with email "owner_e2e_3@gmail.com" owns the establishment "burger_king"
    When the establishment "burger_king" is created
    Then the status code for establishment "burger_king" creation is 401
    And the system does not have the establishment "burger_king"

  @cleanEstablishments
  @cleanOwners
  Scenario: Create a valid establishment with 0 spaces
    Given the owner with email "owner_e2e_4@gmail.com" and password "owner4" was created
    And the establishment called "mostaza" has characteristics:
      | type    | restaurant          |
      | name    | Mostaza             |
      | address | Cabildo 1010        |
      | city    | CABA                |
      | state   | CABA                |
      | zip     | 1430ACV             |
      | country | Argentina           |
    And the owner with email "owner_e2e_4@gmail.com" owns the establishment "mostaza"
    When the establishment "mostaza" is created
    Then the status code for establishment "mostaza" creation is 401
    And the system does not have the establishment "mostaza"

  @cleanEstablishments
  @cleanOwners
  Scenario: Create a valid establishment with 2 spaces
    Given the owner with email "owner_e2e_5@gmail.com" and password "owner5" was created
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
      | openSpace              | false       |
      | n95Mandatory           | false       |
    And "wunderbar" has a space with characteristics:
      | name                   | Segundo piso |
      | hasExit                | false        |
      | m2                     | 500          |
      | estimatedVisitDuration | 45           |
      | openSpace              | true         |
      | n95Mandatory           | false        |
    And the owner with email "owner_e2e_5@gmail.com" owns the establishment "wunderbar"
    When the establishment "wunderbar" is created
    Then the status code for establishment "wunderbar" creation is 201
    And the system has the establishment "wunderbar"
    And the system has 2 spaces for the establishment "wunderbar"

  @cleanEstablishments
  @cleanOwners
  Scenario: Create two valid establishments
    Given the owner with email "owner_e2e_6@gmail.com" and password "owner6" was created
    And the establishment called "mc_donalds" has characteristics:
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
      | openSpace              | false       |
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
      | openSpace              | false       |
      | n95Mandatory           | false       |
    And the owner with email "owner_e2e_6@gmail.com" owns the establishment "mc_donalds"
    And the owner with email "owner_e2e_6@gmail.com" owns the establishment "wunderbar"
    When the establishment "mc_donalds" is created
    And the establishment "wunderbar" is created
    Then the status code for establishment "mc_donalds" creation is 201
    And the system has the establishment "mc_donalds"
    And the system has 1 spaces for the establishment "mc_donalds"
    And the status code for establishment "wunderbar" creation is 201
    And the system has the establishment "wunderbar"
    And the system has 1 spaces for the establishment "wunderbar"

  @cleanEstablishments
  @cleanOwners
  Scenario: Create a PDF from a valid establishment
    Given the owner with email "owner_e2e_7@gmail.com" and password "owner7" was created
    And the establishment "mc_donalds" with a space owned by "owner_e2e_7@gmail.com" exists
    When the PDF for the establishment "mc_donalds" is requested
    And the status code for the PDF generation for "mc_donalds" is 200
    And the response for the PDF generation for "mc_donalds" has type application pdf
    And the response for the PDF generation for "mc_donalds" has an attachment

  @cleanEstablishments
  @cleanOwners
  Scenario: Create a PDF from a invalid establishment
    Given the owner with email "owner_e2e_8@gmail.com" and password "owner8" was created
    And the establishment called "burger_king" has characteristics:
      | type    | restaurant          |
      | name    | Burger King         |
      | zip     | 1430ACV             |
      | country | Argentina           |
    And "burger_king" has a space with characteristics:
      | name                   | Primer piso |
      | hasExit                | false       |
      | m2                     | 1000        |
      | estimatedVisitDuration | 60          |
      | openSpace              | false       |
      | n95Mandatory           | false       |
    And the owner with email "owner_e2e_8@gmail.com" owns the establishment "burger_king"
    When the establishment "burger_king" is created
    And the PDF for the establishment "burger_king" is requested
    Then the status code for establishment "burger_king" creation is 401
    And the status code for the PDF generation for "burger_king" is 400
