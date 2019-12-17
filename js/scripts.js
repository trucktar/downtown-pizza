$(document).ready(function() {
  $("form#pizzaCraft").submit(function(event) {
    let size, crust, toppings, count;
    size = $("#pizzaSize :selected");
    crust = $("#pizzaCrust :selected");
    toppings = $("#pizzaToppings :checked");

    count = parseInt($("#pizzaCount input").val());

    event.preventDefault();
  });
});

// Pizza Constructor
function PizzaOrder(pizzaSize, pizzaCrust, pizzaToppings, pizzaCount) {
  this.size = pizzaSize;
  this.crust = pizzaCrust;
  this.toppings = pizzaToppings; //toppings array
  this.count = pizzaCount;
}

PizzaOrder.prototype.getPrice = function() {
  let sizePrice, crustPrice, toppingsPrice;
  sizePrice = parseInt(this.size.val());
  crustPrice = parseInt(this.crust.val());

  toppingsPrice = this.toppings.map(function() {
    return parseInt($(this).val());
  });
  let toppingsTotalPrice = 0;
  for (let i = 0; i < toppingsPrice.length; i++) {
    toppingsTotalPrice += toppingsPrice[i];
  }

  let orderPrice = (sizePrice + crustPrice + toppingsTotalPrice) * this.count;
  return orderPrice;
};
