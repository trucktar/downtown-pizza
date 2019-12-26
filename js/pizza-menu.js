$(document).ready(function() {
  // Default to 1st <option> for all <select>s
  $("select").prop("selectedIndex", 0);

  let $type, $size, $name, $price;
  $("select").click(function() {
    if (this.id === "pizzaType") {
      updateMenu(this, "tbody");
    } else {
      updateMenu(this, "td");
    }
  });

  $("tr:not(:only-child)").click(function() {
    $type = $("select#pizzaType :selected");
    $size = $("select#pizzaSize :selected");

    $name = $("th", this);
    $price = $('td:not(":hidden")', this);
    let newPizza = new PizzaOrder($type.html(), $size.html(), $name.html(), $price.html());

    console.log(newPizza);
  });
});

function updateMenu(select, target) {
  $(select).change(function() {
    $(target).each(function() {
      if ($(this).index() === select.selectedIndex + 1) {
        $(this).fadeIn();
      } else {
        $(this).fadeOut();
      }
    });
  });
}

function PizzaOrder(pizzaType, pizzaSize, pizzaName, pizzaPrice) {
  this.type = pizzaType;
  this.size = pizzaSize;
  this.name = pizzaName;
  this.price = pizzaPrice;
}
