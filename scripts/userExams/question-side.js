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

function getParentLi(element) {
    if (element === null || element === undefined) {
        return null;
    }
    if (element.nodeName === 'LI') {
        return element;
    } else {
        return getParentLi(element.parentElement);
    }
}

function getQuestionData() {
    var clone = document.querySelector('main .content .container .info h4').cloneNode();
    var inners = clone.querySelectorAll('span, ul');
    for (var i = 0; i < inners.length; i += 1) {
        clone.removeChild(inners[i]);
    }
    var title = clone.innerText;
    var data = document.querySelector('main .container .question').outerHTML;
    var splitedPathName = location.pathname.split('/');
    var fileName = splitedPathName[splitedPathName.length - 1];
    var fileId = fileName.replace('.html', '');
    return {
        id: fileId,
        title: title,
        data: data
    };
}

function onSaveQuestionModalOpen() {
    var exams = getExamCollection();
    if (!exams) {
        exams = [];
    }
    var html = '<ul id="exams-collection" class="collection">';
    for (var i = 0; i < exams.length; i += 1) {
        html += '<li data-id="' + exams[i].id + '" class="collection-item">' + exams[i].name + '<a class="secondary-content modal-close"><i class="material-icons">send</i></a></li>';
    }
    html += '</ul>';
    var container = document.getElementById('add-question-exam-list');
    container.innerHTML = html;
    var examItems = container.querySelectorAll('li a.secondary-content');
    for (var i = 0; i < examItems.length; i += 1) {
        examItems[i].addEventListener('click', function(e) {
            var target = e.target;
            var li = getParentLi(target);
            if (li === null) {
                return;
            }
            var id = li.getAttribute('data-id');
            if (id === null || id === undefined) {
                return;
            }
            var exams = getExamCollection();
            //var splitedPathName = location.pathname.split('/');
            //var fileName = splitedPathName[splitedPathName.length - 1];
            //var fileId = fileName.replace('.html', '');
            var question = getQuestionData();
            for (var j = 0; j < exams.length; j += i) {
                if (exams[j].id === id) {
                    if (!exams[j].question.includes(question)) {
                        exams[j].question.push(question);
                    }
                    //if (!exams[j].questions.includes(fileId)) {
                    //    exams[j].questions.push(fileId);
                    //}
                }
            }
            setExamCollection(exams);
        });
    }
}

function createAddNewExamModal() {
    var innerHTML = 
        '<div class="modal-content">' +
        '   <h4>Adicionar Nova Prova</h4>' +
        '   <div>' +
        '       <div class="row">' +
        '           <div class="input-field col s12">' +
        '               <input id="new-exam-name" type="text" />' +
        '               <label for="new-exam-name" class="">Nome da Prova</label>' +
        '           </div>' +
        '       </div>' +
        '   </div>' +
        '</div>' +
        '<div class="modal-footer">' +
        '   <a class="modal-close waves-effect waves-green btn-flat">Cancelar</a>' +
        '   <a id="new-exam-add-btn" class="modal-close waves-effect waves-green btn-flat">Adicionar</a>' +
        '</div>';
    var modal = document.createElement('div');
    modal.setAttribute('id', 'add-exam-to-list');
    modal.className = 'modal bottom-sheet';
    modal.innerHTML = innerHTML;
    document.body.appendChild(modal);
    var createExamButton = modal.querySelector('#new-exam-add-btn')
    createExamButton.addEventListener('click', function() {
        var nameInput = modal.querySelector('#new-exam-name');
        var name = nameInput.value;
        var exam = createExam(name);
        // var splitedPathName = location.pathname.split('/');
        // var fileName = splitedPathName[splitedPathName.length - 1];
        // exam.questions.push(fileName.replace('.html', ''));
        exam.questions.push(getQuestionData());
        var examsCollection = getExamCollection();
        examsCollection.push(exam);
        setExamCollection(examsCollection);
    });
    M.Modal.init(modal);
}

function createModal() {
    createAddNewExamModal();
    var innerHTML = 
        '<div class="modal-content">' +
        '   <h4>Adicionar Questão</h4>' +
        '   <div id="add-question-exam-list"></div>' +
        '</div>' +
        '<div class="modal-footer">' +
        '   <a href="#add-exam-to-list" class="modal-close modal-trigger waves-effect waves-green btn-flat">Adicionar Nova Prova</a>' +
        // '   <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>' +
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
    if (info !== null && info !== undefined 
        && infoHeading !== null && infoHeading !== undefined) {
        createDropDown(info, infoHeading);
        createModal();
    }
});
