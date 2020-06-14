$(document).ready(function () {
    $('#profileupdate').on('submit', function (e) {
        e.preventDefault();

        var first_name = $('#firstname').val();
        var last_name = $('#lastname').val();
        var faculty = $('#faculty').val();
        var department = $('#department').val();
        var matric_no = $('#matricno').val();
        var access = window.localStorage.getItem('Accesstoken');
        $('#profilebtn').attr('disabled',true);
        $.ajax({
            url: "https://peak-tutors-ub.herokuapp.com/api/accounts/profile-update/",
            method: "POST",
           
            data: {
                first_name : first_name,
                last_name : last_name,
                faculty : faculty,
                department: department,
                matric_no : matric_no,
            },
        
            headers : {
                Authorization : "Bearer " + JSON.parse(access)
            },

            dataType: 'JSON'
        }).done(function (response) {
            console.log(response);

            $('#profileupdate')
            var count = 1;
            var timer = setInterval(function () {
                count--;
                $('#redirect-count').html(count);
            }, 1000);

            setTimeout(function () {
                clearInterval(timer);
                window.location.href = 'homepage.html';
            }, 1000);
        }).fail(function (error) {
            console.log(error);
            $('#profilebtn').removeAttr('disabled');
            alert("Ooops! An Error Occurred");
        });
    });

});