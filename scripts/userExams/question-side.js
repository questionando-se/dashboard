document.addEventListener('DOMContentLoaded', function(){
    var info = document.querySelector('main .content .container .info');
    var infoHeading = info.querySelector('h4');
    if (!info || !infoHeading) {
        return;
    }
    var dropDown = document.createElement('ul');
    dropDown.setAttribute('id', 'user-exams-dropdown');
    dropDown.className = 'dropdown-content';
    dropDown.innerHTML = '<li><a id="user-exams-add-to-exam">Salvar Questão</a></li>';
    info.appendChild(dropDown);
    var dropDownTrigger = document.createElement('span');
    dropDownTrigger.className = 'right dropdown-trigger';
    dropDownTrigger.setAttribute('data-target', 'user-exams-dropdown');
    dropDownTrigger.innerHTML = '<i class="material-icons">more_vert</i>';
    infoHeading.appendChild(dropDownTrigger);
    var dropDownInstance = M.Dropdown.init(dropDownTrigger, {});
});
