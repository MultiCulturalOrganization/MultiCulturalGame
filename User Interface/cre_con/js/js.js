var text = document.getElementById("p1");

(function () {
    $('#button5').click(function () {
        $('#span5').html(function (i, val) {
            return val * 1 + 1;
        });
    });
}.call(this));

function thankyou() {
	text.innerHTML = "Thank you for your support!";
}