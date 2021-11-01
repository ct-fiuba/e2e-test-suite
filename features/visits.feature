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
      | openSpace              | false       |
      | n95Mandatory           | false       |
    And the owner with email "owner_e2e_30@gmail.com" owns the establishment "wunderbar2"
    And the user with email "testing30@gmail.com", DNI "40404040" and password "pass1234" was created
    And the user log in with email "testing30@gmail.com" and password "pass1234"
    And we generate a genux token for "testing30@gmail.com"
    When the establishment "wunderbar2" is created
    And the user with email "testing30@gmail.com" visited the space from establishment "wunderbar2" 10 minutes ago with user data:
      | vaccinated             | 1           |
      | illnessRecovered         | true        |
      | vaccinatedDate         | 01/01/2021  |
      | illnessRecoveredDate     | 01/05/2021  |
      | vacccineReceived       | AstraZeneca |
    Then the status code for the visit creation of the user with email "testing30@gmail.com" is 201

  @cleanEstablishments
  @cleanOwners
  @cleanUsers
  @cleanVisits
  Scenario: Create two visits from different users in the same space
    Given the owner with email "owner_e2e_31@gmail.com" and password "owner30" was created
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
      | openSpace              | false       |
      | n95Mandatory           | false       |
    And the owner with email "owner_e2e_31@gmail.com" owns the establishment "wunderbar2"
    And the user with email "testing31@gmail.com", DNI "40404040" and password "pass1234" was created
    And the user log in with email "testing31@gmail.com" and password "pass1234"
    And we generate a genux token for "testing31@gmail.com"
    And the user with email "testing32@gmail.com", DNI "40404040" and password "pass1234" was created
    And the user log in with email "testing32@gmail.com" and password "pass1234"
    And we generate a genux token for "testing32@gmail.com"
    When the establishment "wunderbar2" is created
    And the user with email "testing31@gmail.com" visited the space from establishment "wunderbar2" 15 minutes ago with user data:
      | vaccinated             | 1           |
      | illnessRecovered         | true        |
      | vaccinatedDate         | 01/01/2021  |
      | illnessRecoveredDate     | 01/05/2021  |
      | vacccineReceived       | AstraZeneca |
    And the user with email "testing32@gmail.com" visited the space from establishment "wunderbar2" 10 minutes ago with user data:
      | vaccinated             | 0           |
      | illnessRecovered         | false       |
    Then the status code for the visit creation of the user with email "testing31@gmail.com" is 201
    And the status code for the visit creation of the user with email "testing32@gmail.com" is 201

  @cleanEstablishments
  @cleanOwners
  @cleanUsers
  @cleanVisits
  Scenario: Add exit timestamp to a visit
    Given the owner with email "owner_e2e_33@gmail.com" and password "owner33" was created
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
      | openSpace              | false       |
      | n95Mandatory           | false       |
    And the owner with email "owner_e2e_33@gmail.com" owns the establishment "wunderbar2"
    And the user with email "testing33@gmail.com", DNI "40404040" and password "pass1234" was created
    And the user log in with email "testing33@gmail.com" and password "pass1234"
    And we generate a genux token for "testing33@gmail.com"
    When the establishment "wunderbar2" is created
    And the user with email "testing33@gmail.com" visited the space from establishment "wunderbar2" 60 minutes ago with user data:
      | vaccinated             | 0           |
      | illnessRecovered         | false       |
    And we generate a genux token for "testing33@gmail.com"
    And the user with email "testing33@gmail.com" closed the visit to the space from establishment "wunderbar2" 30 minutes ago with user data:
      | vaccinated             | 0           |
      | illnessRecovered         | false       |
    Then the status code for the visit creation of the user with email "testing33@gmail.com" is 201
    Then the status code for the visit exit of the user with email "testing33@gmail.com" is 201
