window.onload = function(){
    //$('body').html('ayush')
    alert("Genrate your CSS code for clip path polygon()");
    var counter = 1;
    
    var container_index;
    var body_height;
    var body_width;
    var left_pos;
    var top_pos;
    var container_dim;
    var x;
    var y;
    var per_x;
    var per_y;
    var pos_str;
    var pos_lst = [];
    const hex_code = () => {
        return "hsla(" + ~~(360 * Math.random()) + "," +
                "70%," +
                "80%,1)";
    };
    
    function update(event) {
        x = event.touches[0].clientX - 10;
        y = event.touches[0].clientY - 10;
        var index = $(this).index();
        $(this).css({
            'left':x+'px',
            'top':y+'px'
        });
        per_x = (x - left_pos + 10)*100/container_dim;
        per_y = (y - top_pos + 10)*100/container_dim;
        per_x = Math.round(per_x);
        per_y = Math.round(per_y);
        container_index = $(this).index() - 5;
        pos_lst[container_index] = per_x+'% '+per_y+'%';
        //console.log(pos_lst)
        pos_str = 'polygon('+pos_lst.join(', ')+')';
        if ($('.dot').length > 2) {
            $('#working_stage').css('clip-path', pos_str);
        }
        else{
            $('#working_stage').css('clip-path', 'none');
        }
        $('#css').html('clip-path : ' + pos_str + ';');
    }
    function update_init(){
        body_height = $(document).height();
        body_width = $(document).width();
        container_dim = $('#working_stage').height();
        top_pos = $('#working_stage').position().top;
        left_pos = $('#working_stage').position().left;
    }
    
    $('#insert').click(add_element);
    function add_element() {
        $('body').append(`<div class="dot" style='background-color:${hex_code()};'>${counter++}</div>`);
        $('.dot').on('touchmove', update);
        $('.dot').on('touchstart', update_init);
        pos_lst.push('50% 50%');
        //console.log(pos_lst);
        pos_str = 'polygon('+pos_lst.join(', ')+')';
        $('#css').html('clip-path : ' + pos_str + ';');
    }
    
    $('#delete').click(function(){
        $('.dot:last-child').remove();
        pos_lst.pop();
        pos_str = 'polygon('+pos_lst.join(', ')+')';
        $('#css').html('clip-path : ' + pos_str + ';');
        if(counter > 0){
            counter--;
        }
    });
    
    var test = document.querySelector('#css');
    var output = document.querySelector('#css_cover');
    output.addEventListener('click', function() {
        const str = test.innerText;
        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'fixed';
        el.style.top = '-100vh';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        test.style.animation = 'anim 0.3s infinite';
        output.style.animation = 'anim 0.3s infinite';
        output.style.opacity = '1';
        navigator.vibrate(100);
        setTimeout(function() {
            test.style.animation = 'none';
            output.style.animation = 'none';
        }, 300);
        setTimeout(function() {
            output.style.opacity = '0';
        }, 500);
    });
}
