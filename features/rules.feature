@ct-api
@auth-server
Feature: Visits

  @cleanRules
  Scenario: Create a valid visit
    When the admin logs in
    And a new rule identified by the name "rule1" is created with fields:
      | index                     | 1                  |
      | contagionRisk             | Alto               |
      | durationCmp               | <                  |
      | durationValue             | 20                 |
      | m2Cmp                     | >                  |
      | m2Value                   | 30                 |
      | spaceValue                | Abierto            |
      | n95Mandatory              | false              |
      | vaccinated                | 2                  |
      | vaccinatedDaysAgoMin      | 21                 |
      | vaccineReceived           | AstraZeneca        |
      | covidRecovered            | true               |
      | covidRecoveredDaysAgoMax  | 90                 |
    Then the status code for the rule "rule1" creation is 201
