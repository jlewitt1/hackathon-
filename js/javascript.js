$(document).ready(function() {
var token = "4d9c3533-6b15-4bef-ba2c-4f211ffadd40";
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
                    console.log(data);
                        createBubble(data, category);
                }); 
            },1000*i, category);
      }
    }

     //function to create each individual bubble
    function createBubble(data, category){
            var mybubble = $('<div/>');
            var mybubblewrapper = $('<div/>');
            var title = $('<h2>').text(category.toUpperCase());
            var content = $('<div>').addClass('content');
            for( var i = 0; i<3; i++){
                var space = $('<span>').text('----');
                content.append(space);
                var article = $('<span>').text(data.posts[i].title);
                content.append(article);
                content.append($('<br>'))
            };
            mybubble.attr('data-popularity', data.totalResults);
            mybubble.append(title);
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

       
    }

    //function to change values of selected countryå
    function countryClick(){
        $(".nav-option").click(function(event){
            $('#bubble-container').empty();
            countrySelected = event.target.id;
            $(".nav-option").removeClass("countrySelect");
            $(this).addClass("countrySelect");
            createBubbles(countrySelected);
            });

        }

    function goodNewsClick(){
        $(".goodNews").click(function () {
            var snd = new Audio("./sounds/sounds.wav");
            snd.play();
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
               var snd = new Audio("./sounds/pop.wav");
               snd.play();
           var clickedBubble = $(this);
           e.stopPropagation();
           activeWidth=$(clickedBubble).width();
           activeHeight=$(clickedBubble).height();

           activex=$(clickedBubble).position().left;
           activey=$(clickedBubble).position().top;           
           var bubbleSize = Math.min($(window).width(), $(window).height());
           clickedBubble.addClass("activeBubble");
               clickedBubble.removeClass("x1");
           clickedBubble.css({"z-index":"12345","width":bubbleSize+"px","height":bubbleSize+"px","z-index":"12345","position":"fixed"});
           $(".bubble").not(".activeBubble").addClass("disabled");
            $("#cover").css("display","block");


        });
    }

    function changeBackGround(){//change the theme of the pair
        $(".color").click(function(){
            color=this.id;

            if(color=="random"){
                var bubbles= $(".bubble");
                console.log(bubbles);
                for(i = 0;i<bubbles.length;i++)
                {$(bubbles[i]).css("backgroundColor",getRandomColor())}
                $(".content").css("color","white");
            }
            else if(color=="blue"){
                $(".bubble").css("backgroundColor", "#99ccff");
                $(".content").css("color","white");
            }
            else if(color=="green"){
                $(".bubble").css("backgroundColor", "#77dd77");
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
            var snd = new Audio("./sounds/pop.wav");
            snd.play();
            var activeBubble = $(".activeBubble");
            $(".disabled").removeClass("disabled");
            $("#cover").css("display","none");
          
           activeBubble.css({"zindex":"3","width":activeHeight+"px","height":activeHeight+"px", "position":"inherit","z-index":"3"});
            $(".activeBubble").addClass("x1");
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
    countryClick();
    newsclose();
    changeBackGround();
    getRandomColor();
    goodNewsClick();
$(document).on("click", ".bubble", newsopen);
$(document).on("click", ".activeBubble", newsclose);


});

