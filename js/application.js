//Functions

var calculateSubTotal = function (ele) {
  //var quantityItem = parseFloat($(ele).find(".quantity input").val());
  //var quantityItem = parseFloat(Math.round($(ele).find(".quantity input").val() * 100) / 100).toFixed(2);
  var quantityItem = Number(`${$(ele).find(".quantity input").val()}`);
  //var priceItem = parseFloat($(ele).children(".price").text());
  //var priceItem = parseFloat(Math.round($(ele).children(".price").text() * 100) / 100).toFixed(2);
  var priceItem = Number(
    `${$(ele).children(".price").text()}`.replace(/[^0-9.-]+/g, "")
  );

  var subTotal = quantityItem * priceItem;
  if (subTotal >= 0) {
    $(ele)
      .children(".subtotal")
      .html(`$${parseFloat(Math.round(subTotal * 100) / 100).toFixed(2)}`);
  }

  return subTotal;
};

var sum = function (acc, x) {
  return acc + x;
};

var updateTotalCart = function () {
  var allSubTotals = [];

  $("tbody tr").each(function (i, ele) {
    var subTotal = calculateSubTotal(ele);
    allSubTotals.push(subTotal || 0); // push result of subtotal function to array or a zero if NaN
  });

  if (allSubTotals.length == 0) {
    $("#totalCart").html(`$--.--`);
  } else {
    var totalCart = allSubTotals.reduce(sum);
    $("#totalCart").html(
      `$${parseFloat(Math.round(totalCart * 100) / 100).toFixed(2)}`
    );
  }
};

//Execution sequence
$(document).ready(function () {
  updateTotalCart();
  // remove button
  $("body").on("click", ".remove", function (event) {
    $(this).closest("tr").remove();
    updateTotalCart();
  });

  //update shopping cart
  var timeout;
  $("body").on("input", "tr input", function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      updateTotalCart();
    }, 500);
  });

  //Add item code
  $("#addItem").on("submit", function (event) {
    event.preventDefault();
    var item = $(this).children(".item").val();
    var price = $(this).children(".price").val();

    //inject into DOM
    $("tbody").append(`<tr> 
  <td class="item">${item}</td>
  <td class="price">$${price}</td>
  <td class="quantity">
    <label>QTY</label><input type="number" min="0" value="1"/>
    <button class="btn btn-light btn-sm mb-1 remove">Remove</button>
  </td>
  <td class="subtotal"></td>
  </tr>
  `);
    updateTotalCart();
  });
});
