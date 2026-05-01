Feature: Sauce Demo Login
  As a shopper I want secure access so I can browse products.

  Scenario Outline: TC_01 - Invalid login shows error
    Given I am on the login page
    When I enter username "<username>" and password "<password>"
    And I submit the login form
    Then I should see login error containing "Epic sadface: Username and password do not match any user in this service"
    Examples:
      | username      | password     |
      | standard_user | Anuradha@123 |

  Scenario: TC_02 - Success login redirects to inventory
    Given I am on the login page
    When I login with credentials from LoginData row 1
    Then I should see the inventory header "Swag Labs"
