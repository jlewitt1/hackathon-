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
        {countryName: "France",
            countryCode: "france"},   
        {countryName: "Israel",
            countryCode: "israel"},    
        {countryName: "United States",
            countryCode: "usa"}
      ];

    var countrySelected = "usa";

    //set category array
    var categories = ["entertainment","finance","tech","business","religion","media","sports","health","travel","education"];
    var images = ['australia','germany','england','israel','france','usa'];

    //function to create country buttons
    function createCountry() {
        var navBar = $('<ul/>');
        navBar.attr("id", "country");
        for (var i = 0; i < countries.length; i++) {
            var myItem = $('<button/>');
            myItem.addClass('nav-option').attr("id", countries[i].countryCode);
            myItem.css("background-size","cover").css("background-repeat","no-repeat").css('background-image',"url(./images/" + images[i] + ".png)");
            //myItem.text(countries[i].countryName);
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
                $.get("http://webhose.io/filterWebContent?token=a23dc392-09bf-43d4-8250-2e5c956e5cce&format=json&ts=1500570230490&sort=crawled&q=location%3A"+countrySelected+"%20site_category%3A"+category, 
                    function (data) {
                        console.log(data);
                        createBubble(data, category);
                }); 
            }, 700*i, category);
             window.setTimeout(function () { 
                $('.instructions').hide();
             },1000);
      }
    }

    //function to create each individual bubble
    function createBubble(data, category){
            var mybubble = $('<div/>');
            var mybubblewrapper = $('<div/>');
            var text = category;
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

            var size = setBubbleSize(data.totalResults);
            mybubble.css({
                width: size,
                height: size,
                paddingTop: "50px",
                backgroundColor: "pink"
            });

            mybubblewrapper.append(mybubble);

            $('#bubble-container').append(mybubblewrapper);

            var counter = 0;
            $(".bubble").hover(function (event) {
            var bubble = $(event.target);
            bubble.css('z-index', counter+=1);
        });
    }

    //function to change values of selected country
    function countryClick(){
        $(".nav-option").click(function(event){
            $('#bubbleContainer').empty();
            countrySelected = event.target.id;
            console.log(countrySelected);
            createBubbles(countrySelected);
        })
    }

    //set size of each bubble (min & max sizes)
    function setBubbleSize (numOfArticle) { 
        var size  = 300 + 100*Math.round(numOfArticle / 200);
        return size>500?500:size;
   }

    var activeWidth;
    var activeHeight;
    var activex;
    var activey;
    
    function newsopen() {
        $(".bubble").click(function (e) {
            
           var clickedBubble = $(e.target);
           e.stopPropagation();
           activeWidth=$(e.target).width();
           activeHeight=$(e.target).height();
           console.log(activeWidth);
           
           activex=$(e.target).position().left;
           activey=$(e.target).position().top;           
           var bubbleSize = Math.min($(window).width(), $(window).height());
           clickedBubble.css({"width":bubbleSize,"height":bubbleSize,"z-index": "12345", "position":"fixed","left":"50%", "transform": "translateX(-50%)","top":"200px"});
            
            clickedBubble.removeClass("x1");
            $(".bubble.x1").addClass("disabled");
            $("#cover").css("display","block");
        });
    }

    function newsclose() {
        $("#cover").click(function (e) {
              alert(activeHeight);
            var activeBubble = $(".bubble").not(".disabled")
            alert(activeBubble.text());
            activeBubble.addClass("x1");
            $(".disabled").removeClass("disabled");
            $("#cover").css("display","none");
            console.log(activeHeight);

           activeBubble.css({"width":activeHeight+"px","height":activeHeight+"px","z-index": "none", "position":"inherit","left":activex+"px", "transform": "translateX(-50%)","top":activey+"px"});
           });
    }

    createCountry();
    countryClick();
    newsopen();
    newsclose();
});




