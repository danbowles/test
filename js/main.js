(function($, cars) {
  var availableCars = cars;
  var dreamCars = [];
  var $carsSelect = $('select');
  var $carsList = $('ul');
  var $addToListButton = $('button');
  
  function sortAvailableCars() {
    availableCars.sort(function(carA, carB) {
      if (carA.make > carB.make) {
        return 1;
      } else if (carA.make < carB.make) {
        return -1;
      } else {
        if (carA.model > carB.model) {
          return 1;
        } else {
          return -1;
        }
      }
    });
  }

  function refreshAvailableCarsSelect() {
    $carsSelect.find('option').remove();
    availableCars.forEach(function(car, index) {
      $carsSelect.append(
        $('<option>')
        .text(car.make + ' ' + car.model)
        .val(index)
      );
    });
  }

  function refreshCarList() {
    $carsList.find('li').remove();
    dreamCars.forEach(function(car, index) {
      $carsList.append(
        $('<li>').text(car.make + ' ' + car.model)
      );
    });
  }

  function addCarToList(event) {
    var $selectedCar = $carsSelect.find(':selected');
    var selectedIndex = $selectedCar.index();

    if (!$selectedCar.length) {
      return;
    }

    dreamCars.push(
      availableCars.splice(selectedIndex, 1)[0]
    );

    refreshCarList();

    $carsSelect
      .find('option')
      .eq(selectedIndex)
      .remove();

    $carsSelect
      .find('option').eq(selectedIndex)
      .prop('selected', true);
  }

  function removeCarFromList(event) {
    var $carToRemove = $carsList.find(event.target);
    var carIndex = $carToRemove.index();

    availableCars.push(
      dreamCars.splice(carIndex, 1)[0]
    );
    
    sortAvailableCars();
    refreshAvailableCarsSelect();

    $carToRemove.remove();

  }
  
  function init() {
    sortAvailableCars();
    refreshAvailableCarsSelect();

    // Events
    $addToListButton.on('click', addCarToList);
    $carsList.on('click', 'li', removeCarFromList);
  }

  $(function() {
    init();
  });

})(jQuery, dreamCars);