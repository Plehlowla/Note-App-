let notes = [
    {
        id: new Date(),
        title: 'Sample Note One',
        body: 'This is our example for our sample note.',
        bgColor: 'pink'
    }
]

const createElement = (tag, classes = []) => { // tag is the element, and second paragram will add the classes to that element.
    const element = document.createElement(tag);
    classes.forEach(cl => {
        element.classList.add(cl);
    })
    return element;
}

const createNoteView = (note) => {
    const noteDiv = createElement('div', ['note']);
    noteDiv.id = note.id

    const textDiv = createElement('div', ['text']);
    textDiv.style.backgroundColor = note.bgColor;

    const titleP = createElement('b',['title']);
    titleP.innerHTML = note.title;

    const bodyP = createElement('p',['body']);
    bodyP.innerHTML = note.body;
    
    const editBtn = createElement('button', ['edit']);
    editBtn.innerHTML = 'Edit Note';
    const deleteBtn = createElement('button',['delete']);
    deleteBtn.innerHTML = 'Delete Note';

    textDiv.append(titleP);
    textDiv.append(bodyP);
    noteDiv.append(textDiv);
    noteDiv.append(editBtn);
    noteDiv.append(deleteBtn);

    editBtn.onclick = () => editNote(noteDiv);
    deleteBtn.onclick = () => deleteNote(noteDiv);

    return noteDiv;
}

const cancelEdit = (noteDiv) => {
    const titleP = noteDiv.querySelector('b.title');
    titleP.contentEditable = false;
    const bodyP = noteDiv.querySelector('p.body');
    bodyP.contentEditable = false;

    const editBtn = noteDiv.querySelector('button.edit');
    editBtn.innerHTML = 'Edit Note';
    const deleteBtn = noteDiv.querySelector('button.delete');
    deleteBtn.innerHTML = 'Delete Note';

    const note = notes.find(note => note.id == noteDiv.id);
    titleP.innerHTML = note.title;
    bodyP.innerHTML = note.body;
    editBtn.onclick = () => editNote(noteDiv);
    deleteBtn.onclick = () => deleteNote(noteDiv);
}

const editNote = (noteDiv, editSave = false) => {
    const titleP = noteDiv.querySelector('b.title');
    titleP.contentEditable = true;
    titleP.focus();
    const bodyP = noteDiv.querySelector('p.body');
    bodyP.contentEditable = true;

    const editBtn = document.querySelector('button.edit');
    editBtn.innerHTML = 'Save Note';
    const deleteBtn = noteDiv.querySelector('button.edit');
    deleteBtn.innerHTML = 'Cancel Edit';
    deleteBtn.onclick = () => cancelEdit(noteDiv);
    editBtn.onclick = () => editNote(noteDiv, true);

    if (editSave) {
        const note = notes.find(note => note.id == noteDiv.id);
        note.title = titleP.innerText.trim();
        note.body = bodyP.innerText.trim();

        deleteBtn.innerHTML = 'Delete Note';
        editBtn.innerHTML = 'Edit Note';

        titleP.contentEditable = false;
        bodyP.contentEditable = false;

        editBtn.onclick = () => editNote(noteDiv);
        deleteBtn.onclick = () => deleteNote(noteDiv);
    }
}

const saveNote = ()=> {
    const titleInput = document.querySelector('input#title');
    const bodyInput = document.querySelector('input#body');
    const bgColorInput = document.querySelector('select');
    const id = new Date().getTime();
    const note = {
        id, title: titleInput.value, body: bodyInput.value, bgColor: bgColorInput.value
    }
    const noteDiv = createNoteView(note);
    notesDiv.prepend(noteDiv);
    titleInput.value = '';
    bodyInput.value = '';
    bgColorInput.value = 'Select Color';
}

const deleteNote = (noteDiv) => {
    noteDiv.remove();
    notes = notes.filter(note => note.id != noteDiv.id);
}

document.querySelector('button.add').onclick = () => saveNote();

const notesDiv = document.querySelector('.notesDiv');
notes.forEach(note => {
    const noteDiv = createNoteView(note);
    notesDiv.append(noteDiv);
})