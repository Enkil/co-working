const $ = require('jquery');

$( document ).ready(function() {

    // Add CSS file to head section
    $.ajax({
        url:"../css/app.css",
        success:function(data){
            $("<style></style>").appendTo("head").html(data);
        }
    });

});