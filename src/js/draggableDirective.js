angular.module('objectTable').directive("allowDrag", function() {
  return {
    restrict: "A",
    controller:function(){},
    compile:function (el,attr){
      return function pre(scope, element, attrs,ctrl) {
        element.attr('draggable',true);
        //var ctrl = this;
        element.bind("dragstart", function( e ) {
          ctrl.target = this;
          this.classList.add("dragged");
          e.dataTransfer.setData("text", ctrl.target.getAttribute("index"));
        });

        element.bind("dragover", function( e ) {
          e.preventDefault();
        });

        element.bind("dragenter", function( e ) {
          ctrl.toTarget = this;
          if(!this.classList.contains("draggedOver") && !this.classList.contains("dragged"))
            this.classList.add("draggedOver");
          e.preventDefault();
          e.stopPropagation();
        });

        element.bind("dragleave", function( e ) {
          this.classList.remove("draggedOver");
        });

        element.bind("dragend", function( e ) {
         this.classList.remove("dragged");
         var draggedOver = ctrl.target.parentNode.getElementsByClassName("draggedOver");
         if(draggedOver.length)
          draggedOver[0].classList.remove("draggedOver");
      });

        element.bind("drop", function( e ) {
         var currentIndex = ctrl.toTarget.getAttribute("index"),
         draggedIndex = e.dataTransfer.getData("text");
         if(typeof currentIndex == 'undefined' || typeof draggedIndex == 'undefined') throw "Please add 'index' attribute for drag-n-drop function!";
         element.parent().controller('objectTable').changeColumnsOrder(currentIndex,draggedIndex);
         e.preventDefault();
       });
      };
    }

  };
});