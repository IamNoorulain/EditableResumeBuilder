document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resumeForm') as HTMLFormElement;
    const resumeContainer = document.getElementById('resume') as HTMLElement;
    const editToggle = document.getElementById('editToggle') as HTMLButtonElement;
    let isEditing = false;

    form.addEventListener('submit', (e: Event) => {
        e.preventDefault();
        updateResume();
    });

    editToggle.addEventListener('click', () => {
        isEditing = !isEditing;
        editToggle.textContent = isEditing ? 'Save Changes' : 'Edit Resume';
        toggleEditMode();
    });

    function updateResume() {
        const fields = ['name', 'title', 'email', 'phone', 'degree', 'school', 'eduYear', 'jobTitle', 'company', 'expYear', 'responsibilities', 'skills'];
        
        fields.forEach(field => {
            const input = document.getElementById(field) as HTMLInputElement | HTMLTextAreaElement;
            const output = document.getElementById(`resume${field.charAt(0).toUpperCase() + field.slice(1)}`) as HTMLElement;
            
            if (field === 'responsibilities' || field === 'skills') {
                output.innerHTML = '';
                input.value.split(',').forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item.trim();
                    output.appendChild(li);
                });
            } else {
                output.textContent = field === 'email' || field === 'phone' ? `${field.charAt(0).toUpperCase() + field.slice(1)}: ${input.value}` : input.value;
            }
        });

        resumeContainer.style.display = 'block';
        editToggle.style.display = 'block';
    }

    function toggleEditMode() {
        const editableElements = document.querySelectorAll('.editable');
        
        editableElements.forEach((element: Element) => {
            if (isEditing) {
                element.addEventListener('click', editField);
                element.classList.add('editing');
            } else {
                element.removeEventListener('click', editField);
                element.classList.remove('editing');
            }
        });
    }

    function editField(e: Event) {
        const element = e.currentTarget as HTMLElement;
        const field = element.dataset.field;
        const currentText = element.innerText;
        
        if (field === 'responsibilities' || field === 'skills') {
            const textarea = document.createElement('textarea');
            textarea.value = Array.from(element.children).map(li => li.textContent).join(', ');
            element.innerHTML = '';
            element.appendChild(textarea);
            textarea.focus();
            
            textarea.addEventListener('blur', () => {
                element.innerHTML = '';
                textarea.value.split(',').forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item.trim();
                    element.appendChild(li);
                });
            });
        } else {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentText;
            element.innerHTML = '';
            element.appendChild(input);
            input.focus();
            
            input.addEventListener('blur', () => {
                element.textContent = input.value;
            });
        }
    }
});