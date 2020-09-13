function getExamCollection() {
    var exams = JSON.parse(window.localStorage.getItem('userExams'));
    return exams;
}

function setExamCollection(exams) {
    window.localStorage.setItem('userExams', JSON.stringify(exams));
}

function getExam(id) {
    var exams = getExamCollection();
    for (var i = 0; i < exams.length; i += 1) {
        if (exams[i].id === id) {
            return exams[i];
        }
    }
    return null;
}

function setExam(exam) {
    var exams = getExamCollection();
    var outputExams = [];
    for (var i = 0; i < exams.length; i += 1) {
        if (exams[i].id === exam.id) {
            outputExams.push(exam);
        } else {
            outputExams.push(exams[i]);
        }
    }
    setExamCollection(outputExams);
}
