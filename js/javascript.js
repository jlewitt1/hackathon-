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
            countryCode: "usa"}
      ];

    var countrySelected = "";
    var headerCategory = "";

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
        var numberOfBubble= categories.length;
        for (var i = 0; i <numberOfBubble ; i++) {
            var mybubble = $('<div/>');
            var mybubblewrapper = $('<div/>');
            mybubble.text(categories[i]);
            mybubble.addClass('bubble x1');
            mybubble.attr("id", categories[i]);
            mybubblewrapper.addClass("bubblewrapper col-md-2");
            k=getRandomsize();
            mybubble.css({
                width: k,
                height: k,
                verticalAlign: top,
                paddingTop: "50px",
                backgroundColor: "pink"
            });
            mybubblewrapper.append(mybubble);
            $('#bubble-container').append(mybubblewrapper);

        }
        function getRandomsize() {
            var size=Math.floor(Math.random()*300+250);
            size=size+"px";
            return size;
        }
    }
    //function to change values of selected country
    function countryClick(){
        $(".nav-option").click(function(event){
            countrySelected = event.target.id;
            console.log(countrySelected);
        })
    }
    //set headers according to country
    function setHeaders() {
        $(".bubble").hover(function (event) {
            console.log(countrySelected);
            
            headerCategory = event.target.id;
            console.log(headerCategory);
                var headerTitle = $.get("http://webhose.io/filterWebContent?token=261e9791-7278-4dfe-9339-93049307257c&format=json&ts=1500561071414&sort=crawled&q=location%3A"+countrySelected+"%20performance_score%3A%3E9%20social.facebook.likes%3A%3E1000%20site_category%3A"+ headerCategory, function (data) {
                    console.log(data);
                    for(var i=0; i<3; i++){
                        var headerContent = data.posts[i].title;
                        console.log(headerContent);
                    }
                });
            $(this).text(headerTitle);
            }, function () {
                $(this).text(this.id);

            }
        );
    }


createBubble();
    createCountry();
    setHeaders();
countryClick();

});




