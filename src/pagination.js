var pagination = {
  _setCurrent: function(i) {
    if (!that.$pagination) { return; }

    // begin mod: set pagination parent class based on index.
    // now pagination can have conditional formatting (dark or light) 
    // depending on the current slide. Parent class is called superslides-1,
    // superslides-2, etc.
    // similar to technique in http://stackoverflow.com/questions/2644299/jquery-removeclass-wildcard
    that.$pagination.removeClass(function (index, css) {
      return (css.match (/(^|\s)superslides-\S+/g) || []).join(' ');
    }).addClass('superslides-'+(i+1));
    // end mod

    var $pagination_children = that.$pagination.children();

    $pagination_children.removeClass('current');
    $pagination_children.eq(i)
      .addClass('current');
  },
  _addItem: function(i) {
    var slide_number = i + 1,
        href = slide_number,
        $slide = that.$container.children().eq(i),
        slide_id = $slide.attr('id');

    if (slide_id) {
      href = slide_id;
    }

    var $item = $("<a>", {
      'href': "#" + href,
      'text': href
    });

    $item.appendTo(that.$pagination);
  },
  _setup: function() {
    if (!that.options.pagination || that.size() === 1) { return; }

    var $pagination = $("<nav>", {
      'class': that.options.elements.pagination.replace(/^\./, '')
    });

    that.$pagination = $pagination.appendTo(that.$el);

    for (var i = 0; i < that.size(); i++) {
      that.pagination._addItem(i);
    }
  },
  _events: function() {
    that.$el.on('click', that.options.elements.pagination + ' a', function(e) {
      e.preventDefault();

      var hash  = that._parseHash(this.hash), index;
      index = that._upcomingSlide(hash, true);

      if (index !== that.current) {
        that.animate(index, function() {
          that.start();
        });
      }
    });
  }
};
