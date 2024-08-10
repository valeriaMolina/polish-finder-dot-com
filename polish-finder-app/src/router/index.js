import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BrandsView from '@/views/BrandsView.vue'
import BrandView from '@/views/BrandView.vue'
import PolishesView from '@/views/PolishesView.vue'
import ExploreView from '@/views/ExploreView.vue'
import HelpView from '@/views/HelpView.vue'
import AuthView from '@/views/auth/AuthView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import ContributeView from '@/views/ContributeView.vue'
import SubmissionsBrandView from '@/views/submissions/SubmissionsBrandView.vue'
import SubmissionsPolishView from '@/views/submissions/SubmissionsPolishView.vue'
import UserProfileView from '@/views/UserProfileView.vue'
import WishListView from '@/views/WishListView.vue'
import CollectionView from '@/views/CollectionView.vue'
import SubmissionsView from '@/views/submissions/SubmissionsView.vue'
import FindDupeView from '@/views/FindDupeView.vue'
import AdvancedSearchView from '@/views/AdvancedSearchView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/explore',
      name: 'explore',
      component: ExploreView
    },
    {
      path: '/brands',
      name: 'brands',
      component: BrandsView
    },
    {
      path: '/brands/:brandId',
      name: 'brand',
      component: BrandView
    },
    {
      path: '/polishes',
      name: 'polishes',
      component: PolishesView
    },
    {
      path: '/help',
      name: 'help',
      component: HelpView
    },
    {
      path: '/login',
      name: 'auth',
      component: AuthView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/contribute',
      name: 'contribute',
      component: ContributeView
    },
    {
      path: '/contribute/new/brand',
      name: 'contribute-brand',
      component: SubmissionsBrandView
    },
    {
      path: '/contribute/new/polish',
      name: 'contribute-polish',
      component: SubmissionsPolishView
    },
    {
      path: '/account',
      name: 'user-profile',
      component: UserProfileView
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: WishListView
    },
    {
      path: '/my-collection',
      name: 'collection',
      component: CollectionView
    },
    {
      path: '/submissions',
      name: 'submissions',
      component: SubmissionsView
    },
    {
      path: '/search/dupes',
      name: 'find-dupe',
      component: FindDupeView
    },
    {
      path: '/search/advanced',
      name: 'advanced-search',
      component: AdvancedSearchView
    }
  ]
})

export default router
