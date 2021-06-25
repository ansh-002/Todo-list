// check off specific todos by clicking 

$("ul").on("click", "li", function(){
    $(this).toggleClass("completed");
   });
  