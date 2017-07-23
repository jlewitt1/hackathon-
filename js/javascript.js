/**
 * Created by hillarosenberg on 2017/07/23.
 */
$(document).ready(function() {
    var token = "a23dc392-09bf-43d4-8250-2e5c956e5cce";

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

    var countrySelected = "usa";
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
    function createBubbles(country){
        var numberOfBubble= categories.length;
        for (var i = 0; i <numberOfBubble ; i++) {
            var category = categories[i];
            window.setTimeout(function(category) {
                console.log(category);
                var headerTitle = $.get("http://webhose.io/filterWebContent?token=a23dc392-09bf-43d4-8250-2e5c956e5cce&format=json&ts=1500570230490&sort=crawled&q=location%3A"+countrySelected+"%20site_category%3A"+category, 
                    function (data) {
                        console.log(data);
                        createBubble(data, category);
                }); 
            }, 700*i, category);
             $('body').removeClass('instructions');
      }
    }

    //function to create each individual bubble
    function createBubble(data, category){
            var mybubble = $('<div/>');
            var mybubblewrapper = $('<div/>');
            var text = "<div class='title'>category<div/>";
            text += "<br /><div class='content'>";
                for( var i = 0; i<3; i++){
                    var headerContent = data.posts[i].title;
                    console.log(headerContent);
                    text += headerContent + '<br />';
                };
            text+="<div/>";
            mybubble.html(text);
            mybubble.addClass('bubble x1');
            mybubble.attr("id", category);
            mybubblewrapper.addClass("bubblewrapper col-md-2");

            var size = setBubbleSize(data.totalResults);//todo: change size accroding to data.totalResults
            mybubble.css({
                width: size,
                height: size,
               // top: Math.floor(Math.random()*10),
                paddingTop: "50px",
                backgroundColor: "pink"
            });
            mybubblewrapper.append(mybubble);

            $('#bubble-container').append(mybubblewrapper);

            var counter = 0;
            $(".bubble").hover(function (event) {
            var bubble = $(event.target);
            bubble.css('z-index', counter+=1);
            //console.log(bubble)
        });
    }

    //function to change values of selected country
    function countryClick(){
        $(".nav-option").click(function(event){
            countrySelected = event.target.id;
            console.log(countrySelected);
            createBubbles(countrySelected);
        })
    }
    //set headers according to country
    function setHeaders() {
        $(".bubble").hover(function () {
            var bubble = event.target;
            console.log(bubblewrapper)
        });
        //setBubbleSize();
    }

    //set size of each bubble (min & max sizes)
    function setBubbleSize (numOfArticle) { 
        var size  = 300 + 100*Math.round(numOfArticle / 200);
        return size>500?500:size;
   }

    createCountry();
    countryClick();
    setHeaders();
});




