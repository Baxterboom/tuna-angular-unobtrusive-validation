angular.module('index', ['tuna.jsval'])
  .controller('index-controller', function () {

    tuna.jsval.options.onError = createTooltip;

    this.itemsCount = 1;
    this.items = new Array(this.itemsCount);

    this.renderItems = function () {
      this.items = new Array(this.itemsCount);
    }

    function createTooltip(validator, ngModel) {
      var element = validator.element;
      var tooltip = element.data('bs.tooltip');
      if (tooltip) tooltip.destroy();

      element.tooltip({
        title: validator.text,
        trigger: 'hover',
        placement: function () {
          if (!window['bootstrap']) return 'auto right';
          return window['bootstrap'].isView('xs') ? 'auto top' : 'auto right';
        }
      });

      element.on('show.bs.tooltip', function () {
        return element.hasClass('ng-invalid') === true;
      });

      tooltip = element.data('bs.tooltip');
      tooltip.tip().addClass('tooltip-error');
      return tooltip;
    }


  });