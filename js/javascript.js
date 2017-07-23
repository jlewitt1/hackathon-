/**
 * Created by hillarosenberg on 2017/07/23.
 */
$(document).ready(function() {

    //set country array
    var countries = [
        {countryName: "Australia",
        countryCode: "australia"},
        {countryName: "Germany",
            countryCode: "germany"},
        {countryName: "England",
            countryCode: "england"},
        {countryName: "United States",
            countryCode: "united states"}
      ]; 

    //set category array
    var categories = ["entertainment","finance","tech","business","religion","media","sports","health","travel"];


    //function to create country buttons
    function createCountry() {
        var navBar = $('<ul/>');
        navBar.attr("id", "country");
        for (var i = 0; i < countries.length; i++) {
            var myItem = $('<button/>');
            myItem.addClass('nav-option').attr("id", countries[i].countryCode);
            myItem.text(countries[i].countryName);
            navBar.append(myItem);

        }
        $('.countries').append(navBar);
    }

    //function to create random bubbles
    function createBubble(){
        var numberOfBubble= 8;
        for (var i = 0; i <numberOfBubble ; i++) {
            var mybubble = $('<div/>');
            var mybubblewrapper = $('<div/>');
            var mybubbletext = $('<div/>');
            mybubbletext.text("bubble"+i);
            mybubble.addClass('bubble x1');
            mybubblewrapper.addClass("bubblewrapper");
            mybubble.css("background-color", "pink");
            k=getRandomsize()
            mybubble.css("width",k);
            mybubble.css("height",k);
            mybubble.css("vertical-align", "top");
            mybubble.css("paddding-top", "50px");
            mybubbletext.css("margin-top", "40%");
            mybubble.append(mybubbletext);
            mybubblewrapper.append(mybubble);
            $('#bubble-container').append(mybubblewrapper);

        }
        function getRandomsize() {
            var size=Math.floor(Math.random()*100+200);
            size=size+"px";
            return size;
        }
    }

    function countryClick(){
        $(this).click(function(event){
            var country = event.target.id;
            $.get("http://webhose.io/filterWebContent?token=261e9791-7278-4dfe-9339-93049307257c&format=json&ts=1500548708366&sort=crawled&q=language%3Aenglish%20site_type%3Anews%20social.facebook.likes%3A%3E5000%20location%3A"+ country +"%20site_category%3Apolitics",function(products) {
                console.log(products);
            })

        })
    }



countryClick();
createCountry();
createBubble();
});




