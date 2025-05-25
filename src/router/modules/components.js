/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/pages/rop/layout/Layout'

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noredirect',
  name: 'ComponentDemo',
  meta: {
    title: 'components',
    icon: 'component'
  },
  hidden: false,
  children: [
    {
      path: 'tinymce',
      component: () => import('@/pages/rop/components-demo/tinymce'),
      name: 'TinymceDemo',
      meta: { title: 'tinymce' }
    },
    {
      path: 'markdown',
      component: () => import('@/pages/rop/components-demo/markdown'),
      name: 'MarkdownDemo',
      meta: { title: 'markdown' }
    },
    {
      path: 'json-editor',
      component: () => import('@/pages/rop/components-demo/jsonEditor'),
      name: 'JsonEditorDemo',
      meta: { title: 'jsonEditor' }
    },
    {
      path: 'splitpane',
      component: () => import('@/pages/rop/components-demo/splitpane'),
      name: 'SplitpaneDemo',
      meta: { title: 'splitPane' }
    },
    {
      path: 'avatar-upload',
      component: () => import('@/pages/rop/components-demo/avatarUpload'),
      name: 'AvatarUploadDemo',
      meta: { title: 'avatarUpload' }
    },
    {
      path: 'dropzone',
      component: () => import('@/pages/rop/components-demo/dropzone'),
      name: 'DropzoneDemo',
      meta: { title: 'dropzone' }
    },
    {
      path: 'sticky',
      component: () => import('@/pages/rop/components-demo/sticky'),
      name: 'StickyDemo',
      meta: { title: 'sticky' }
    },
    {
      path: 'count-to',
      component: () => import('@/pages/rop/components-demo/countTo'),
      name: 'CountToDemo',
      meta: { title: 'countTo' }
    },
    {
      path: 'mixin',
      component: () => import('@/pages/rop/components-demo/mixin'),
      name: 'ComponentMixinDemo',
      meta: { title: 'componentMixin' }
    },
    {
      path: 'back-to-top',
      component: () => import('@/pages/rop/components-demo/backToTop'),
      name: 'BackToTopDemo',
      meta: { title: 'backToTop' }
    },
    {
      path: 'drag-dialog',
      component: () => import('@/pages/rop/components-demo/dragDialog'),
      name: 'DragDialogDemo',
      meta: { title: 'dragDialog' }
    },
    {
      path: 'dnd-list',
      component: () => import('@/pages/rop/components-demo/dndList'),
      name: 'DndListDemo',
      meta: { title: 'dndList' }
    },
    {
      path: 'drag-kanban',
      component: () => import('@/pages/rop/components-demo/dragKanban'),
      name: 'DragKanbanDemo',
      meta: { title: 'dragKanban' }
    }
  ]
}

export default componentsRouter
