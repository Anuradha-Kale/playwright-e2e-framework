Feature: Shopping cart actions
  So that I manage my selections I want to update the cart contents.

  Background:
    Given I am authenticated with LoginData row 1

  Scenario: Add item to cart and remove it
    When I add product "Sauce Labs Bolt T-Shirt" to the cart from inventory
    And I open the cart
    And I remove the cart item
    Then the cart should be empty
