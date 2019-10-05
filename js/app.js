
const _get = () => {
    $.ajax({
        type: "GET",
        url: "https://makeitreal-todo.herokuapp.com/todo_items",
        headers: { "Content-Type": "application/json" },
    }).done(function (data) {
        data.forEach(element => {
            task(element);
        })

    });
}

const _post = (value) => {
    console.log(value);
    $.ajax({
        type: "POST",
        url: "https://makeitreal-todo.herokuapp.com/todo_items",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({ "title": value }),
    }).done(function (data) {
        task(data);
    });
}

const _delete = (id) => {
    $.ajax({
        type: "DELETE",
        url: "https://makeitreal-todo.herokuapp.com/todo_items/" + id,
        headers: { "Content-Type": "application/json" }
    }).done(function (data) {
        console.log('Deleted');
    });
}

const _put = (task, id) => {
    console.log('en el Put Data', task);
    console.log('en el Put ID', id);
    $.ajax({
        type: "PATCH",
        url: "https://makeitreal-todo.herokuapp.com/todo_items/" + id,
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(task)
    }).done(function (data) {
        console.log('Data Updated');
    });
}

const task = (input) => {
    return $('.tasks').append(`<li class="  d-flex justify-content-between  card-text task" id="${input.id}"><span class='delete'><i class="fa fa-trash"></i></span> ${input.title} <span class="edit"><i class="fa fa-pencil "></i></span></li>`)
}

const onInputKeypress = function(e) {
    if (e.which == 13) {
        _post($(this).val());
        $(this).val('')
    }
}

const onDelete = function(e) {
    const id = parseInt($('.task').attr('id'));
    $(this).parent().remove();
    _delete(id)
    event.stopPropagation();
}

const onToggleDone = function(e) {
    const id = parseInt($('.task').attr('id'));
    $(e.currentTarget).toggleClass("completed");
    if ($(e.currentTarget).hasClass('completed')) {
        state({ 'id': id, 'done': true })
    } else {
        state({ 'id': id, 'done': false })
    }
    event.stopPropagation();
}

const onClickEdit = function(e) {
    const id = $(this).parent().attr('id')
    const text = $(this).parent().text();
    $(this).parent().replaceWith('<input type="text" id="' + id + '" class="form-control editText" placeholder="Add new task" value="' + text + '" aria-label="Username" aria-describedby="basic-addon1">')
    console.log('Esto es ID' + id);
    event.stopPropagation();
}

const onClickEditText = function(e) {
    if (e.which == 13) {
        const id = parseInt($(this).attr('id'));
        const text = $(this).val();
        console.log('se MANDA AQUI ');
        state({ 'id': id, 'title': text });
        $(this).replaceWith(`<li class=" d-flex justify-content-between card-text task" id="${id}"><span class='delete'><i class="fa fa-trash"></i></span>${text}<span class="edit"><i class="fa fa-pencil "></i></span></li>`)

    }
    e.stopPropagation();
}

$("input").on('keypress', onInputKeypress);
$('ul').on('click', '.delete', 'i', onDelete);
$('ul').on('click', 'li', onToggleDone);
$('ul').on('click', '.edit', onClickEdit);
$("ul").on('keypress', '.editText', onClickEditText);

const state = (data) => {
    _put(data, data.id);
}

_get()

