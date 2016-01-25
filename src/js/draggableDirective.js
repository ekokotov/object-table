angular.module('objectTable').directive('allowDrag', function() {
  return {
    restrict: 'A',
    controller: function() {},
    compile: function(el, attr) {

      function removeDragClass(element, className) {
        var elm = element[0].parentNode.querySelector('.' + className);
        if (!!elm)
          elm.classList.remove(className);
      }

      return function pre(scope, element, attrs, ctrl) {
        element.attr('draggable',true);

        element.bind('dragstart', function(e) {
          ctrl.target = this;
          this.classList.add('dragged');
          var ev = e.originalEvent || e; // override event for touch events
          ev.dataTransfer.setData('text', ctrl.target.cellIndex);
        });

        element.bind('dragover', function(e) {
          e.preventDefault();
        });

        element.bind('dragenter', function(e) {
          ctrl.toTarget = this;
          if (!this.classList.contains('draggedOver') && !this.classList.contains('dragged'))
            this.classList.add('draggedOver');
          e.preventDefault();
          e.stopPropagation();
        });

        element.bind('dragend', function(e) {
          if (this.classList.contains('dragged'))
            this.classList.remove('dragged');
          e.preventDefault();
        });

        element.bind('dragleave', function(e) {
          this.classList.remove('draggedOver');
        });

        element.bind('drop', function(e) {
         var currentIndex = ctrl.toTarget.cellIndex,
         ev = e.originalEvent || e,
         draggedIndex = parseInt(ev.dataTransfer.getData('text'),10);
         removeDragClass(element, 'dragged');
         removeDragClass(element, 'draggedOver');
         element.parent().controller('objectTable').changeColumnsOrder(currentIndex,draggedIndex);
         e.preventDefault();
       });
      };
    }

  };
});
