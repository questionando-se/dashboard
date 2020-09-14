function createDropDown(info, infoHeading) {
    var dropDown = document.createElement('ul');
    dropDown.setAttribute('id', 'user-exams-dropdown');
    dropDown.className = 'dropdown-content';
    dropDown.innerHTML = '<li><a class="modal-trigger" href="#add-question-to-exam-modal" id="user-exams-add-to-exam">Salvar Questão</a></li>';
    info.appendChild(dropDown);
    var dropDownTrigger = document.createElement('span');
    dropDownTrigger.className = 'right dropdown-trigger';
    dropDownTrigger.setAttribute('data-target', 'user-exams-dropdown');
    dropDownTrigger.innerHTML = '<i class="material-icons">more_vert</i>';
    infoHeading.appendChild(dropDownTrigger);
    M.Dropdown.init(dropDownTrigger, {});
}

function onSaveQuestionModalOpen() {
    var exams = getExamCollection();
    if (!exams) {
        exams = [];
    }
    for (var i = 0; i < exams.length; i += 1) {

    }
}

function createModal() {
    var innerHTML = 
        '<div class="modal-content">' +
        '   <h4>Adicionar Questão</h4>' +
        '   <div id="add-question-exam-list"></div>' +
        '</div>' +
        '<div class="modal-footer">' +
        '   <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>' +
        '</div>';
    var modal = document.createElement('div');
    modal.setAttribute('id', 'add-question-to-exam-modal');
    modal.className = 'modal bottom-sheet';
    modal.innerHTML = innerHTML;
    document.body.appendChild(modal);
    M.Modal.init(modal, {
        onOpenStart: onSaveQuestionModalOpen
    });
}

document.addEventListener('DOMContentLoaded', function(){
    var info = document.querySelector('main .content .container .info');
    var infoHeading = info.querySelector('h4');
    if (!info || !infoHeading) {
        return;
    }
    createDropDown(info, infoHeading);
    createModal();
});
