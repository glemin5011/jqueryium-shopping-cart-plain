//Functions 

var calculateSubTotal = function (ele) {
  //var quantityItem = parseFloat($(ele).find(".quantity input").val());
  var quantityItem = parseFloat(Math.round($(ele).find(".quantity input").val() * 100) / 100).toFixed(2);
  //var priceItem = parseFloat($(ele).children(".price").text());
  //var priceItem = parseFloat(Math.round($(ele).children(".price").text() * 100) / 100).toFixed(2);
  var priceItem = Number(`${$(ele).children(".price").text()}`.replace(/[^0-9.-]+/g,""));
  

  var subTotal = quantityItem * priceItem;
  if (subTotal >= 0) {
  $(ele).children(".subtotal").html(`$${parseFloat(Math.round(subTotal * 100) / 100).toFixed(2)}`);
}

  return subTotal;
};

var sum = function (acc, x) {
  return acc + x;
};




//Execution sequence
$(document).ready(function () {
  var allSubTotals = [];

  $("tbody tr").each(function (i, ele) {
    var subTotal = calculateSubTotal(ele);
      allSubTotals.push(subTotal || 0); // push result of subtotal function to array or a zero if NaN
  });

  var totalCart = allSubTotals.reduce(sum);
  $("#totalCart").html(`$${parseFloat(Math.round(totalCart * 100) / 100).toFixed(2)}`);
});


