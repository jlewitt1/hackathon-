$(document).ready(function() {
var token = "f9352120-c001-49ee-9467-62ef0ba3c6f7";
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
    var images = ['australia','germany','england','france','israel','usa'];

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
                $.get("http://webhose.io/filterWebContent?token="+token+"&format=json&ts=1500570230490&sort=crawled&q=location%3A"+countrySelected+"%20site_category%3A"+category,
                    function (data) {
                        createBubble(data, category);
                }); 
            }, 700*i, category);
      }
    }


    //function to create each individual bubble
    // function createBubble(data, category){
    //         var mybubble = $('<div/>');
    //         var text = category;
    //         text += "<br /><div class='content'>";
    //             for( var i = 0; i<3; i++){
    //                 var headerContent = data.posts[i].title;

    //                 text += headerContent + '<br />';
    //             };
    //         text+="<div/>";
    //         mybubble.html(text);
    //         mybubble.addClass('bubble');
    //         mybubble.attr("id", category);
    //         mybubble.addClass("bubblewrapper");

    //         var size = setBubbleSize(data.totalResults)/2;
    //         mybubble.css({
    //             width: size,
    //             height: size,
    //             paddingTop: "50px",
    //             backgroundColor: "pink"
    //         });

    //         $('#bubble-container').append(mybubble);

    //         var counter = 0;
    //         $(".bubble").hover(function (event) {
    //         var bubble = $(event.target);
    //     });
    // }

     //function to create each individual bubble
    function createBubble(data, category){
            var mybubble = $('<div/>');
            var mybubblewrapper = $('<div/>');
            // var text = category.toUpperCase();
            // text += "<br /><div class='content'>";
            //     for( var i = 0; i<3; i++){
            //         var headerContent = data.posts[i].title;
            //         text += headerContent + '<br />';
            //     };
            // text+="<div/>";
            var title = $('<h2>').text(category.toUpperCase());
            var content = $('<div>').addClass('content');
            for( var i = 0; i<3; i++){
                var article = $('<span>').text(data.posts[i].title);
                content.append(article);
                content.append($('<br>'))
            };
            mybubble.attr('data-popularity', data.totalResults);
            mybubble.append(title)
            mybubble.append(content);
            mybubble.addClass('bubble x1');
            mybubble.attr("id", category);
            mybubblewrapper.addClass("bubblewrapper col-md-2");


            var fontsize = data.totalResults/50;
            if(fontsize<18){
                fontsize = 18
            }
            else if(fontsize>35){
                fontsize = 35;
            }
            var size = setBubbleSize(data.totalResults);
            mybubble.css({
                width: size,
                height: size,
                paddingTop: "50px",
                backgroundColor: "pink",
                fontSize:fontsize + 'px'

            });

            mybubble.find('.content').css({fontSize:fontsize + 'px'});
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
            $('#bubble-container').empty();
            countrySelected = event.target.id;
            //console.log(countrySelected);
            createBubbles(countrySelected);
        })
    }

    //loading gif while ajax sends
    function loadingGif(){
        $(document).ajaxSend(function(){
            $(".cssload-container").css("display","block");
        });
        $(document).ajaxComplete(function(){
            $(".cssload-container").css("display","none");
        });
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
           var clickedBubble = $(this);
           e.stopPropagation();
           activeWidth=$(clickedBubble).width();
           activeHeight=$(clickedBubble).height();
           console.log(activeWidth);
           
           activex=$(clickedBubble).position().left;
           activey=$(clickedBubble).position().top;           
           var bubbleSize = Math.min($(window).width(), $(window).height());
           console.log(bubbleSize);
           clickedBubble.addClass("activeBubble");
           clickedBubble.css({"width":bubbleSize+"px","height":bubbleSize+"px","z-index":"12345","position":"fixed"});
           $(".bubble").not(".activeBubble").addClass("disabled");
            $("#cover").css("display","block");
        });
    }

function changeBackGround(){//change the theme of the pair
    $(".color").click(function(){
    color=this.id;
    if(color=="random"){
        bubbles= $(".bubble");
        alert(bubbles.size());
        for(var i = 0; i<bubbles.size(); i++) {;
            bubbles[i].css("backgroundColor",getRandomColor());
    }
}
    else if(color=="blue"){
        $(".bubble").css("backgroundColor",color);
        $(".content").css("color","white");
    }
    else{
        $(".bubble").css("backgroundColor",color);
        $(".content").css("color","black");
        }  
    })
}
    function newsclose() {

        $("#cover").click(function (e) {
            var activeBubble = $(".activeBubble");
            $(".disabled").removeClass("disabled");
            $("#cover").css("display","none");
          
           activeBubble.css({"width":activeHeight+"px","height":activeHeight+"px", "position":"inherit","z-index":"3","left":activex+"px", "transform": "translateX(-50%)"});
             $(".activeBubble").removeClass("activeBubble");
           });
    }
    function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

    loadingGif();
    createCountry();
    //createSideBar();
    countryClick();

    newsopen();
    newsclose();
    changeBackGround();
    getRandomColor()
$(document).on("click", ".bubble", newsopen);
$(document).on("click", ".activeBubble", newsclose);


});