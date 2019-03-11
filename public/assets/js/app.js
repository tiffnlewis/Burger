$(document).ready(function(){

    $(".devour").on('click', function(){
        var newState;
        var id = $(this).data('id')
        if($(this).data('state') === 0){
            newState = {
                devoured: 1
            };
        } else {
            newState = {
                devoured: 0
            }
        }
        $.ajax('/api/burgers/' + id, {
            type: 'PUT',
            data: newState
        }).then(function(){
            console.log("updated")
            var scrollPos = $('document').scrollTop()
            location.reload();
            $('document').scrollTop(scrollPos)
        })
    })


    $("#addBurger").on('click', function(){
        event.preventDefault()
        var burgerName = $("#txtAdd").val().trim()
        if(burgerName === ''){
            $("#frmAdd").addClass("has-error")
        } else {
            $("#frmAdd").removeClass("has-error")
            $.post('/api/burgers/' + burgerName, function(result){
                console.log("inserted", burgerName)
                location.reload();
            })
        }
    })
})