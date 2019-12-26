$(document).ready(function() {
  // On page load, reset selected option
  $("select").prop("selectedIndex", 0);

  let $type, $size, $name, $price;
  $type = $("select#pizzaType :selected");
  $size = $("select#pizzaSize :selected");

  $("select#pizzaType").change(function() {
    $type = $(":selected", this);
    $("tbody").each(function() {
      if ($(this).index() === $type.index() + 1) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
  $("select#pizzaSize").change(function() {
    $size = $(":selected", this);
    $("td").each(function() {
      if ($(this).index() === $size.index() + 1) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });

  $("tr:not(:only-child)").click(function() {
    $name = $("th", this);
    $price = $('td:not(":hidden")', this);
    let newPizza = new PizzaOrder(
      $type.html(),
      $size.html(),
      $name.html(),
      $price.html()
    );

    console.log(newPizza);
  });
});

function PizzaOrder(pizzaType, pizzaSize, pizzaName, pizzaPrice) {
  this.type = pizzaType;
  this.size = pizzaSize;
  this.name = pizzaName;
  this.price = pizzaPrice;
}
