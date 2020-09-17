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

function openLists(id) {
    var exam = getExam(id);
    var html = '';
    for (var i = 0; i < exam.questions.length; i += 1) {
        html += '<div class="question-title">' + exam.questions[i].title + '</div>';
        html += exam.questions[i].data;
    }
    var win = window.open('', exam.name);
    win.document.head.innerHTML = '<meta charset="UTF-8" />\n<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n<title>' + exam.name + '</title>'
        + '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />'
        + '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />'
        + '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css" integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X" crossorigin="anonymous" />'
        + '<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/questionando-se/dashboard@0.0.15/styles/question.css" />'
        + '<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/questionando-se/dashboard@0.0.15/styles/userExams/list.css" />';
    win.document.body.innerHTML = html
        + '<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>';
}

function writeExamCollection() {
    var exams = getExamCollection();
    var collection = document.createElement('ul');
    collection.className = 'collection with-header materialize-collection';
    collection.setAttribute('id', 'exams-collection');
    var html = '<li class="collection-header"><h4>Minhas Provas</h4></li>';
    for (var i = 0; i < exams.length; i += 1) {
        html += '<li class="collection-item" data-id="' + exams[i].id + '"><div>' + exams[i].name;
        html += '<a class="secondary-content tooltipped exam-list" data-position="bottom" data-tooltip="Gerar Lista"><i class="material-icons">view_list</i></a>';
        html += '<a class="secondary-content tooltipped exam-carousel" data-position="bottom" data-tooltip="Responder Questões"><i class="material-icons">view_carousel</i></a>';
        html += '<a class="secondary-content tooltipped exam-delete" data-position="bottom" data-tooltip="Deletar Prova"><i class="material-icons">delete</i></a>';
        html += '</div></li>';
    }
    collection.innerHTML = html;
    var container = document.querySelector('main .content > .container');
    container.appendChild(collection);
    var tooltippeds = collection.querySelectorAll('.tooltipped');
    M.Tooltip.init(tooltippeds, {});

    var deleteButtons = collection.querySelectorAll('.exam-delete');
    for (var i = 0; i < deleteButtons.length; i += 1) {
        deleteButtons[i].addEventListener('click', function(e) {
            var li = getParentLi(e.target);
            if (li === null || li === undefined) {
                return;
            }
            var id = li.getAttribute('data-id');
            if (id === null || id === undefined) {
                return;
            }
            var inputExams = getExamCollection();
            var outputExams = [];
            for (var j = 0; j < inputExams.length; j += 1) {
                if (inputExams[j].id !== id) {
                    outputExams.push(inputExams[j]);
                }
            }
            setExamCollection(outputExams);
            li.parentElement.removeChild(li);
        });
    }

    var listButtons = collection.querySelectorAll('.exam-list');
    for (var i = 0; i < listButtons.length; i += 1) {
        listButtons[i].addEventListener('click', function(e) {
            var li = getParentLi(e.target);
            if (li === null || li === undefined) {
                return;
            }
            var id = li.getAttribute('data-id');
            if (id === null || id === undefined) {
                return;
            }
            openLists(id);
        });
    }

    var carouselButtons = collection.querySelectorAll('.exam-carousel');
    for (var i = 0; i < carouselButtons.length; i += 1) {
        carouselButtons[i].addEventListener('click', function(e) {
            alert('Funcionalidade ainda não implementada.')
        });
    }
}

document.addEventListener('DOMContentLoaded', function(){
    writeExamCollection();
});