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

    return noteDiv;
}

const notesDiv = document.querySelector('.notesDiv');

notes.forEach(note => {
    const noteDiv = createNoteView(note);
    notesDiv.append(noteDiv);
})