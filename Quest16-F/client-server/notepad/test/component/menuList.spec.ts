import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
//ts-ignore
import {MenuList} from '../../src/containers'

const localVue = createLocalVue()

localVue.use(Vuex)
describe('MyComponent.vue', () => {
  let actions
  let state
  let store

  beforeEach(() => {
    state = {
      menuList : ['new',"save","saveAs","login","logout"]
    }

    actions = {
      save: jest.fn(),
      saveAs : jest.fn(),
      new : jest.fn(),
      login : jest.fn(),
      logout : jest.fn()
    }

    store = new Vuex.Store({
      modules: {
        menu: {
          state,
          actions,
          namespaced: true
        }
      }
    })
  })

  it('new button test', () => {
    const wrapper = shallowMount(MenuList, { store, localVue })
    const button = wrapper.find('button[children="save"]');
    button.trigger('click')
    expect(actions.new).toHaveBeenCalled(1)
  })
})