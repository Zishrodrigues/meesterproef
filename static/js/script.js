(function() {
    "use strict";

    var config = {
        elements: {
            todayHeader: document.getElementById('todayHeader'),
            dayOne: document.getElementById('dayOne')
        }
    };

    var app = {
        init: function() {
            console.log('app started :)');
            listDates.setDay();
        }
    };

    var listDates = {
        dayNames: [  'Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'],
        setDay: function() {
            var date = new Date();
            var dayName = listDates.dayNames[date.getDay()];
            config.elements.todayHeader.innerHTML = dayName;
            config.elements.dayOne.innerHTML = listDates.dayNames[date.getDay() - 1];   
        }
    };

    app.init();
})();
