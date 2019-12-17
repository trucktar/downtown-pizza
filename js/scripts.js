$(document).ready(function() {
  $("form#pizzaCraft").submit(function(event) {
    let size, crust, toppings, count;
    size = $("#pizzaSize :selected");
    crust = $("#pizzaCrust :selected");
    toppings = $("#pizzaToppings :checked");

    count = parseInt($("#pizzaCount").val());

    let pizzaOrder = new PizzaOrder(size, crust, toppings, count);
    addToCart(pizzaOrder);

    event.preventDefault();
  });
  // Display checkout button on order placement
  $("#checkoutBtn").click(function() {
    let prices, totalCharge;
    prices = $("#pizzaCart tbody td:last-child").map(function() {
      return parseInt($(this).html());
    });
    totalCharge = 0;
    for (let i = 0; i < prices.length; i++) {
      totalCharge += prices[i];
    }
  });

  // Display delivery location form field
  $("#pick-up").click(function() {
    $("#deliveryLocation").hide();
  });
  $("#deliver").click(function() {
    $("#deliveryLocation").show();
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
// Add pizza to cart
function addToCart(order) {
  let toppings = order.toppings
    .map(function() {
      return this.id;
    })
    .get()
    .join();
  $("#pizzaCart tbody").append(`<tr>
                                  <td>${order.size.html()}</td>
                                  <td>${order.crust.html()}</td>
                                  <td>${toppings}</td>
                                  <td>${order.getPrice()}</td>
                                </tr>`);

  var currentTotalCharge = parseInt($("#tt-charge").html());
  $("#tt-charge").html(currentTotalCharge + order.getPrice());
  $("#checkoutBtn").show();
  $("#delivery").show();
}
