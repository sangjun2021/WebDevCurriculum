// @ts-ignore
import {Post} from '@/components'
import { mount } from '@vue/test-utils'

test('post component test',()=>{
  const wrapper = mount(Post,{
    props : {
      post : {
        title : 'testTitle',
        isEdited : false,
        isSelected : true,
      }
    }
  })
  expect(wrapper.findAll('.edited')).toHaveLength(0);
  expect(wrapper.findAll('.selected')).toHaveLength(1);
  expect(wrapper.text()).toContain('testTitle')
})