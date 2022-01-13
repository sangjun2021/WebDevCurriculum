import { mount } from '@vue/test-utils'
import Todo from '../../src/components/Todo.vue'
test('renders a todo', () => {
  const wrapper = mount(Todo)

  const todo = wrapper.get('[data-test="todo"]')
  console.log(todo)
  expect(todo.text()).toBe('Learn Vue.js 3')
})