var func_drag = function() {
    var group = "<div class='row'><div class='group cell position-0 width-16'>GROUP</div></div>";
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
    $(".group .row").droppable({
        drop: function(event, ui) {
            if (ui.draggable.attr("id") == "btn-group") {
                debugger;
                $(this).parent(".group").after(group);
                func_drag();
            } else if (ui.draggable.attr("id") == "btn-tile") {
                debugger;

                $(this).append(existing_row_tile);
                var kids = $(this).children();
                console.log(kids);
                var new_width = 16;
                if (kids.length) {
                    var new_width = parseInt(16 / kids.length, 10);
                }
                $(this).parent().children().each(function (i) {
                    debugger;
                    // Adjust width of all children
                    var tile_class = $(this).attr("class");
                    var regex_match = tile_class.match(/\bwidth\-(\d+)/);
                    var total_width = regex_match[1];
                    $(this).children(".tile")[i].removeClass(regex_match[0]);
                    $(this).addClass("width-" + new_width);

                });
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
