/**
 * Created by hillarosenberg on 2017/07/23.
 */
$(document).ready(function() {

    //create Navbar (countries already set)
    var menuOptions = ['England', 'France', 'Germany', 'Israel', 'USA'];
    var navBar = $('<ul/>');
    navBar.attr("id", "my-menu");

    for (var i = 0; i < menuOptions.length; i++) {
        var myItem = $('<li/>');
        myItem.addClass('nav-option');
        myItem.text(menuOptions[i]);
        navBar.append(myItem);

    }
    $('.container').append(navBar);

    //get news API
    $.get("https://newsapi.org/v1/articles?source=techcrunch&apiKey=84c305e1594647be8a4ae3a9aa8addce",function(products) {  //result from server generated using myJson
        $('body').removeClass('loading-state');

        console.log(products);
    })

});


