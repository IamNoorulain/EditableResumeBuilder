document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resumeForm');
    var resumeContainer = document.getElementById('resume');
    var editToggle = document.getElementById('editToggle');
    var isEditing = false;
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        updateResume();
    });
    editToggle.addEventListener('click', function () {
        isEditing = !isEditing;
        editToggle.textContent = isEditing ? 'Save Changes' : 'Edit Resume';
        toggleEditMode();
    });
    function updateResume() {
        var fields = ['name', 'title', 'email', 'phone', 'degree', 'school', 'eduYear', 'jobTitle', 'company', 'expYear', 'responsibilities', 'skills'];
        fields.forEach(function (field) {
            var input = document.getElementById(field);
            var output = document.getElementById("resume".concat(field.charAt(0).toUpperCase() + field.slice(1)));
            if (field === 'responsibilities' || field === 'skills') {
                output.innerHTML = '';
                input.value.split(',').forEach(function (item) {
                    var li = document.createElement('li');
                    li.textContent = item.trim();
                    output.appendChild(li);
                });
            }
            else {
                output.textContent = field === 'email' || field === 'phone' ? "".concat(field.charAt(0).toUpperCase() + field.slice(1), ": ").concat(input.value) : input.value;
            }
        });
        resumeContainer.style.display = 'block';
        editToggle.style.display = 'block';
    }
    function toggleEditMode() {
        var editableElements = document.querySelectorAll('.editable');
        editableElements.forEach(function (element) {
            if (isEditing) {
                element.addEventListener('click', editField);
                element.classList.add('editing');
            }
            else {
                element.removeEventListener('click', editField);
                element.classList.remove('editing');
            }
        });
    }
    function editField(e) {
        var element = e.currentTarget;
        var field = element.dataset.field;
        var currentText = element.innerText;
        if (field === 'responsibilities' || field === 'skills') {
            var textarea_1 = document.createElement('textarea');
            textarea_1.value = Array.from(element.children).map(function (li) { return li.textContent; }).join(', ');
            element.innerHTML = '';
            element.appendChild(textarea_1);
            textarea_1.focus();
            textarea_1.addEventListener('blur', function () {
                element.innerHTML = '';
                textarea_1.value.split(',').forEach(function (item) {
                    var li = document.createElement('li');
                    li.textContent = item.trim();
                    element.appendChild(li);
                });
            });
        }
        else {
            var input_1 = document.createElement('input');
            input_1.type = 'text';
            input_1.value = currentText;
            element.innerHTML = '';
            element.appendChild(input_1);
            input_1.focus();
            input_1.addEventListener('blur', function () {
                element.textContent = input_1.value;
            });
        }
    }
});
