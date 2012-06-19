
function widthReOrder(children) {
    var len = children.length;
    children.each(function(index) {
    var child = $(this);
    var new_width = 16;
    new_width = parseInt(16 / len, 10);
    var tile_class = child.attr("class");
    //fix width class
    var regex_match = tile_class.match(/\bwidth\-(\d+)/);
    var total_width = regex_match[1];
    child.removeClass(regex_match[0]);
    child.addClass("width-" + new_width);
    //fix position class
    var regex_match = tile_class.match(/\bposition\-(\d+)/);
    var total_width = regex_match[1];
    child.removeClass(regex_match[0]);
    var position = new_width*index;
    child.addClass("position-" + position);
    });
}

var func_drag = function() {
    var group = "<div class='group cell position-0 width-16'>GROUP</div>";
    var new_row_tile = "<div class='row'><div class='tile cell position-0 width-16'>TILE</div></div>";
    var existing_row_tile = "<div class='tile cell position-0 width-16'>TILE</div>";

    $("#sidebar p").draggable({
        helper: "clone",
        stop: function(event, ui) {
            //
        }
    });

    // instead of '.row .group' we should enable dropping in '#main-wrapper'
    // and then check which element received the drop
    $(".group").droppable({
        drop: function(event, ui) {
            if (ui.draggable.attr("id") == "btn-group") {
                $(this).after(group);
                var children = $(this).parent().children(".group");
                widthReOrder(children);
                func_drag();
            } else if (ui.draggable.attr("id") == "btn-tile") {
                // debugger;
                var row = $(".row", this);
                if(row) {
                    row.append(existing_row_tile);
                } else {
                    $(this).append(new_row_tile);

                }
                var children = row.children();
                widthReOrder(children);
            }
            // r.append(tile);
        }
    });

}
;

$(func_drag());

// $(function() {
//     var min_width = $('#main-wrapper').width()/10;
//     var tile_number = undefined;
//     var old_index = 0;
//     var snap = false;
//     $( ".tile-wrapper" ).resizable({
//         grid: min_width,
//         helper: "ui-resizable-helper",
//         resize: function(event, ui) {
//             var tile = ui.element.parent();
//             var tile_class = tile.attr('class');
//             var regex_match = tile_class.match(/\bspan(\d+)/);
//             var index = 0;
//             if (regex_match) {
//                 tile_number = parseInt(regex_match[1]);
//                 tile.removeClass('span'+tile_number);
//                 var resized_width = ui.size.width - ui.originalSize.width;
//                 console.log('resized', resized_width);

//                 if (resized_width > 0 ) {
//                     index = Math.floor(resized_width / min_width);
//                 } else {
//                     index = Math.ceil(resized_width / min_width);
//                 }

//                 console.log('index', index);
//                 console.log('snap_before', snap);
//                 if (old_index !== index) {
//                     old_index = index;
//                     snap = true;
//                 }
//                 console.log('snap_after', snap);

//                 if (snap) {
//                     tile_number = tile_number + old_index;
//                     snap = false;
//                 }

//                 tile.addClass('span'+tile_number);
//             }
//         },
//     });
// });
