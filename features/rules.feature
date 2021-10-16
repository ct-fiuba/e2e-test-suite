@ct-api
@auth-server
Feature: Rules

  @cleanRules
  Scenario: Create a valid rule
    When the admin logs in
    And a new rule identified by the name "rule1" is created with fields:
      | index                     | 1                  |
      | contagionRisk             | Alto               |
      | durationCmp               | <                  |
      | durationValue             | 20                 |
      | m2Cmp                     | >                  |
      | m2Value                   | 30                 |
      | openSpace                 | true               |
      | n95Mandatory              | false              |
      | vaccinated                | 2                  |
      | vaccinatedDaysAgoMin      | 21                 |
      | vaccineReceived           | AstraZeneca        |
      | covidRecovered            | true               |
      | covidRecoveredDaysAgoMax  | 90                 |
    Then the status code for the rule "rule1" creation is 201

  @cleanRules
  Scenario: Create a valid rule with not all the conditions
    When the admin logs in
    And a new rule identified by the name "rule2" is created with fields:
      | index                     | 1                  |
      | contagionRisk             | Alto               |
      | durationCmp               | <                  |
      | durationValue             | 20                 |
    Then the status code for the rule "rule2" creation is 201
