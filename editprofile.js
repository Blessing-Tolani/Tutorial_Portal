$(document).ready(function () {

    var LastName = window.localStorage.getItem('LastName');
    var FirstName = window.localStorage.getItem('FirstName');
    var MatricNo = window.localStorage.getItem('MatricNo');
    var Department = window.localStorage.getItem('Department');
    var Faculty = window.localStorage.getItem('Faculty');
    var x = window.localStorage.getItem('id');
    var id = JSON.parse(x);

    var first = document.getElementById("firstname");
    var last = document.getElementById("lastname");
    var matric = document.getElementById("matricno");
    var department = document.getElementById("department");
    var faculty = document.getElementById("faculty");

    first.value = LastName;
    last.value = FirstName;
    matric.value = MatricNo;
    department.value = Department;
    faculty.value = Faculty; 

    $('#profileupdate').on('submit', function (e) {
        e.preventDefault();
        var id = JSON.parse(x);
        var first_name = $('#firstname').val();
        var last_name = $('#lastname').val();
        var faculty = $('#faculty').val();
        var department = $('#department').val();
        var matric_no = $('#matricno').val();
        var access = window.localStorage.getItem('Accesstoken');
        $('#profilebtn').attr('disabled',true);
        $.ajax({
            url: "https://peak-tutors-ub.herokuapp.com/api/accounts/profile-update/{id}/",
            method: "PUT",
           
            data: {
                id : id,
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