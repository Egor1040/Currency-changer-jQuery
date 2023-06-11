'use strict'

$(document).ready(function() {
    let resWas = $('.currency-was__value');
    let resBecame = $('.currency-became__value');
    let valuteBefore = $('#valuteBefore');
    let valuteAfter = $('#valuteAfter');
    let getRes = $('.get-result__equal');
    let changePlace = $('.get-result__place');

    const date = new Date();
    let d = date.getDate().toString().padStart(2, '0');
    let m = (date.getMonth() + 1).toString().padStart(2, '0');
    let y = date.getFullYear();
    let f = `${y}${m}${d}`;
    let appDate = `${d}.${m}.${y}`;
    let infoPanelDate = $('.changer__date-now');
    let api = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${f}&json`;

    infoPanelDate.text(appDate);
    
    resWas.one('click', function() {
        $(this).val('');
    });

    getRes.on('click', function() {
       callApi(api,valuteBefore,valuteAfter,resWas,resBecame);
    });

    changePlace.on('click', function() {
        let temp = valuteBefore.val();
        valuteBefore.val(valuteAfter.val());
        valuteAfter.val(temp);

        callApi(api,valuteBefore,valuteAfter,resWas,resBecame);
    });

    function callApi(api,val1,val2,res1,res2) {
        $.ajax(
            {
                url: api,
                dataType: 'json'
            },
        ).done(function(data) {
            let result;
            let rateBefore;
            let rateAfter;

            val1.val() === 'UAH' ? rateBefore = 1 : rateBefore = data.find(item => item.cc === val1.val()).rate;
            val2.val() === 'UAH' ? rateAfter = 1 : rateAfter = data.find(item => item.cc === val2.val()).rate;

            if (val2.val() === 'UAH') {
                result = res1.val() * rateBefore;
            } else if (val1.val() === 'UAH') {
                result = res1.val() / rateAfter;
            } else {
                result = (res1.val() * rateBefore) / rateAfter;
            }
        
            res2.val(result.toFixed(2));
        });
    };
}) 
