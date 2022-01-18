import Tasks from '../src/Components/Tasks.js';

document.body.innerHTML = '<div><ul class="dragable-area"></ul></div>';

describe('Tasks class', () => {
  test('Should be a object of task', () => {
    const task = new Tasks('Malaika');
    expect(task).toEqual({ completed: false, descption: 'Malaika', index: undefined });
  });

  test('Should return sorted data', () => {
    const data = Tasks.db();
    expect(data).toEqual([]);
  });

  test('Should return number of stored data', () => {
    document.body.innerHTML = '<div><ul id="list"></li></div>';
    Tasks.list = document.querySelector('ul');
    const data = Tasks.db().length;
    expect(data).toEqual(Tasks.db().length);
  });

  test('Should return number of stored data plus the new one', () => {
    document.body.innerHTML = '<div><ul id="list"></li></div>';
    const task = new Tasks('Malaika');
    Tasks.list = document.querySelector('ul');
    const data = Tasks.addTask(task);
    expect(data).toEqual(Tasks.db().length);
  });
});