document.addEventListener('DOMContentLoaded', function() {
    var btn = document.getElementById('question-verify');
    var correct = document.getElementsByClassName('question')[0].dataset.correct;
    btn.addEventListener('click', function() {
        var inputs = document.querySelectorAll('input[name="question-alternative"]');
        for (let i = 0; i < inputs.length; i += 1) {
            if (inputs[i].checked) {
                if (i.toString().trim() === correct.toString().trim()) {
                    alert("CERTO");
                } else {
                    alert("ERRADO");
                }
            }
        }
    });
    // materialize initializations
    var elems = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(elems, {
        toolbarEnabled: true
    });
});
