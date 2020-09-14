function createExam(name) {
    return {
        id: Date.now().toString(),
        name: name,
        questions: []
    };
}

function getExamCollection() {
    var raw = window.localStorage.getItem('userExams');
    if (!raw) {
        return [];
    }
    var exams = JSON.parse(raw);
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
