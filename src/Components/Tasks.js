import {
  setEditable,
  addEventsListerners,
  setNonEditable,
} from './domManupulation.js';

class Tasks {
  constructor(descption, index) {
    this.descption = descption;
    this.completed = false;
    this.index = index;
  }

  static list = document.querySelector('ul');

  static db = (data) => {
    if (!data) {
      const datas = ((window.localStorage.getItem('tasks') !== null) ? JSON.parse(window.localStorage.getItem('tasks')) : []);
      return datas.sort((a, b) => parseFloat(a.index) - parseFloat(b.index));
    }
    window.localStorage.setItem('tasks', JSON.stringify(data));
    return true;
  }

  static load = () => {
    this.list.innerHTML = '';
    this.db().forEach((task) => {
      this.createElement(task);
    });
    addEventsListerners();
    return this.db().length;
  }

  static addTask = (task) => {
    const data = this.db();
    data.push(task);
    this.createElement(task);
    this.db(data);
    return this.db().length;
  }

  static removeBook = (button) => {
    let counter = 0;
    let result = this.db();

    button.forEach((btn) => {
      result = result.filter((task) => task.index !== parseInt(btn.getAttribute('data-task-id'), 10));
    });

    result.forEach((row) => {
      row.index = counter;
      counter += 1;
    });

    result = result.sort((a, b) => parseFloat(a.index) - parseFloat(b.index));
    this.db(result);
    const count = this.load();
    document.querySelector('.number-label').innerText = count;
  }

  static updateData(index, prop, value) {
    const data = this.db();
    if (prop === 'completed') {
      data[index].completed = value;
    } else {
      data[index].descption = value;
    }
    this.db(data);
  }

  static createElement = (task) => {
    const listItem = document.createElement('li');
    const form = document.createElement('form');

    form.addEventListener('submit', (el) => {
      el.preventDefault();
      if (el.target.children[0].value !== '') {
        Tasks.updateData(el.target.children[0].getAttribute('data-task-id'), 'descption', el.target.children[0].value);
        el.target.children[0].blur();
      }
    });

    form.classList.add('current-task');
    listItem.classList.add('dragable');
    const button = document.createElement('p');
    const input = document.createElement('input');
    input.setAttribute('data-task-id', task.index);
    const checkbox = document.createElement('input');
    checkbox.setAttribute('data-task-id', task.index);

    checkbox.addEventListener('change', () => {
      Tasks.updateData(checkbox.getAttribute('data-task-id'), 'completed', checkbox.checked);
      if (checkbox.checked) {
        checkbox.parentElement.nextSibling.children[0].classList.add('completed');
      } else {
        checkbox.parentElement.nextSibling.children[0].classList.remove('completed');
      }
    });

    const p = document.createElement('p');
    p.classList.add('checkmark');
    const label = document.createElement('label');

    if (task.completed) {
      checkbox.setAttribute('checked', true);
      input.classList.add('completed');
    }

    checkbox.type = 'checkbox';
    checkbox.classList.add('check-stats');
    label.appendChild(checkbox);
    label.appendChild(p);
    input.type = 'text';
    input.classList.add('input', 'disabled');
    button.classList.add('icon', 'drag-and-drop');
    button.setAttribute('data-task-id', task.index);
    input.value = task.descption;
    listItem.appendChild(label);
    form.appendChild(input);
    listItem.appendChild(form);
    listItem.appendChild(button);
    listItem.draggable = true;

    input.addEventListener('focus', () => {
      setEditable(input);
      button.addEventListener('click', () => {
        Tasks.removeBook([button]);
      });
    });

    input.addEventListener('blur', () => setNonEditable(input));
    this.list.appendChild(listItem);
  }
}
export default Tasks;