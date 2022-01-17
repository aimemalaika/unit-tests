const Task = require('../src/Components/Tasks');

test('Should return sorted data', () => {
  const data = Task.db();
  expect(data).toBe(Array);
});