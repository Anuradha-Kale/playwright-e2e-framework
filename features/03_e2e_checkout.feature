Feature: Checkout happy path
  As a shopper I want to finish a purchase flow end-to-end.

  Scenario: Purchase flow from inventory to confirmation
    Given I am authenticated with LoginData row 1
    When I count inventory items
    And I add product "Sauce Labs Fleece Jacket" to the cart from inventory
    Then the cart badge should be visible

    When I open the cart
    And I start checkout from the cart page
    And I fill checkout step one information from stored customer details
    And I submit checkout step one continue
    Then checkout step two should show product "Sauce Labs Fleece Jacket"

    When I complete the order on checkout step two
    Then URL should contain "checkout-complete"
    And order confirmation heading should contain "Thank you for your order!"
