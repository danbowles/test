(function($, cars, MutationObserver) {
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
    availableCars.forEach(function(car) {
      $carsSelect.append(
        $('<option>')
        .text(car.make + ' ' + car.model)
        .val(car.make)
      );
    });
  }

  function updateInstructions() {
    if ($carsList.children().length) {
      $('.no-cars').addClass('hide');
    } else {
      $('.no-cars').removeClass('hide');
    }
  }

  function initSelectBoxObserver() {
    
  }

  function refreshCarList() {
    $carsList.find('li').remove();
    dreamCars.forEach(function(car) {
      $carsList.append(
        $('<li>').text(car.make + ' ' + car.model)
      );
    });
    $carsList.find('li').append(
      $('<a href="#">').text('Remove')
    );
  }

  function addCarToList() {
    var $selectedCar = $carsSelect.find(':selected');
    var selectedIndex = $selectedCar.index();
    var selectedMake = $selectedCar.val();
    var nextIndex;

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

    nextIndex = $carsSelect
      .find('option[value="' + selectedMake + '"]')
      .first().index();

    if (nextIndex < 0) {
      nextIndex = selectedIndex;
    }

    $carsSelect
      .find('option').eq(nextIndex)
      .prop('selected', true);
  }

  function removeCarFromList(event) {
    event.preventDefault();
    var $carToRemove = $carsList.find($(event.target).parent());
    var carIndex = $carToRemove.index();

    availableCars.push(
      dreamCars.splice(carIndex, 1)[0]
    );
    
    sortAvailableCars();
    refreshAvailableCarsSelect();

    $carToRemove.remove();
  }
  
  function init() {
    var observer;

    sortAvailableCars();
    refreshAvailableCarsSelect();
    initSelectBoxObserver();

    // Events
    $addToListButton.on('click', addCarToList);
    $carsList.on('click', 'li a', removeCarFromList);

    // Select Observer
    observer = new MutationObserver(updateInstructions);
    observer.observe($carsSelect[0], {
      childList: true
    });
  }

  $(function() {
    init();
  });

})(jQuery, dreamCars, (window.MutationObserver || window.WebKitMutationObserver));