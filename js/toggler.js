var jQuery = require("jquery");
var scrollify = require("jquery-scrollify");

var toggler = {

  toggles: "",

  init: function init() {
    var sections = jQuery(".full-height");
    this.toggles = jQuery(".toggler-block");
    this.toggles.each(
      function(index,elem){
        var togglerContent = jQuery(this).find(".toggler-block__content");
       jQuery(this).on("click",function(e){
        if(togglerContent[0].classList.contains("toggler--closed")){
            togglerContent.removeClass("toggler--closed").addClass("toggler--open");
        }else{
            togglerContent.removeClass("toggler--open").addClass("toggler--closed");
        }
       });
    });
  },
};

module.exports = toggler;
