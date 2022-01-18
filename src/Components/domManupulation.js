const setEditable = (element) => {
  element.parentElement.nextSibling.classList.add('remove-line');
  element.parentElement.nextSibling.classList.remove('drag-and-drop');
  element.parentElement.parentElement.classList.add('highlighted');
};

const setNonEditable = (element) => {
  element.parentElement.nextSibling.classList.remove('remove-line');
  element.parentElement.nextSibling.classList.add('drag-and-drop');
  element.parentElement.parentElement.classList.remove('highlighted');
};

const refreshPage = (element) => {
  element.classList.add('rotate-me');

  setTimeout(() => {
    element.classList.remove('rotate-me');
  }, 2000);
};

const dragStart = () => {
};

const dragOver = (e) => {
  e.preventDefault();
  if (e.target.classList.contains('dragable')) {
    e.target.classList.add('over');
  }
};

const dropOver = () => {
};

const dragEnter = () => {
};

const dragLeave = (e) => {
  e.target.classList.remove('over');
};

const addEventsListerners = () => {
  const dragables = document.querySelectorAll('dragable');
  const dragablesList = document.querySelectorAll('.dragable-area li');
  dragables.forEach((dragable) => {
    dragable.addEventListener('dragstart', dragStart);
  });

  dragablesList.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dropOver);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
};

export {
  setEditable,
  refreshPage,
  addEventsListerners,
  setNonEditable,
};