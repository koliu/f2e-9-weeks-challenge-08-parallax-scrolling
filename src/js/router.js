import Index from '../components/index.vue';
import About from '../components/about.vue';
import Spec from '../components/spec.vue';

export default {
  routes: [{
      path: '/',
      component: Index,
      alias: '/index',
      children: [{
        path: '/q1',
        name: 'q1',
        component: () =>
          import ('../components/pages/q1.vue')
      }, {
        path: '/q2',
        name: 'q2',
        component: () =>
          import ('../components/pages/q2.vue')
        // }, {
        //   path: '',
        //   name: 'q3',
        //   component: () =>
        //     import ('../components/pages/q3.vue')
        // }, {
        //   path: '',
        //   name: 'finish',
        //   component: () =>
        //     import ('../components/pages/finish.vue')
      }]
    },
    {
      path: '/spec',
      component: Spec
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '*',
      component: () =>
        import ('../components/404.vue'),
      alias: '/404'
    }
  ]
};
