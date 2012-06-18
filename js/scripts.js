$(function() {
    var min_width = $('#main-wrapper').width()/10;
    var tile_number = undefined;
    var old_index = 0;
    var snap = false;
    $( ".tile-wrapper" ).resizable({
        grid: min_width,
        helper: "ui-resizable-helper",
        resize: function(event, ui) {
            var tile = ui.element.parent();
            var tile_class = tile.attr('class');
            var regex_match = tile_class.match(/\bspan(\d+)/);
            var index = 0;
            if (regex_match) {
                tile_number = parseInt(regex_match[1]);
                tile.removeClass('span'+tile_number);
                var resized_width = ui.size.width - ui.originalSize.width;
                console.log('resized', resized_width);
                
                if (resized_width > 0 ) {
                    index = Math.floor(resized_width / min_width);
                } else {
                    index = Math.ceil(resized_width / min_width);
                }
                
                console.log('index', index);
                console.log('snap_before', snap);
                if (old_index !== index) {
                    old_index = index;
                    snap = true;
                }
                console.log('snap_after', snap);
                
                if (snap) {
                    tile_number = tile_number + old_index;
                    snap = false;
                }

                tile.addClass('span'+tile_number);
            }
        },
    });
});
