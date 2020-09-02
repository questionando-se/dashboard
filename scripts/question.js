document.addEventListener('DOMContentLoaded', function() {
    var btn = document.getElementById('question-verify');
    var correct = document.getElementsByClassName('question')[0].dataset.correct;
    btn.addEventListener('click', function() {
        var inputs = document.querySelectorAll('input[name="question-alternative"]');
        var hasChecked = false;
        for (let i = 0; i < inputs.length; i += 1) {
            if (inputs[i].checked) {
                hasChecked = true;
                var modal = document.getElementById('wrong-modal');
                if (i.toString().trim() === correct.toString().trim()) {
                    modal = document.getElementById('correct-modal');
                }
                var instance = M.Modal.getInstance(modal);
                instance.open();
            }
        }
        if (!hasChecked) {
            M.toast({html: 'Ops! Para verificar a resposta, selecione alguma das opções!'});
        }
    });
    // materialize initializations
    var elems = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(elems, {
        toolbarEnabled: true
    });
    elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {});
});