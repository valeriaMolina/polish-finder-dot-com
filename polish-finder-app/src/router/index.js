import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from '@/utils/authUtils';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/navbar/AboutView.vue'),
        },
        {
            path: '/explore',
            name: 'explore',
            component: () => import('../views/ExploreView.vue'),
        },
        {
            path: '/brands',
            name: 'brands',
            component: () => import('../views/BrandsView.vue'),
        },
        {
            path: '/brands/:brandId',
            name: 'brand',
            component: () => import('../views/BrandView.vue'),
        },
        {
            path: '/polishes',
            name: 'polishes',
            component: () => import('../views/PolishesView.vue'),
        },
        {
            path: '/polishes/:polishId',
            name: 'polish',
            component: () => import('../views/PolishView.vue'),
        },
        {
            path: '/login',
            name: 'auth',
            component: () => import('../views/auth/AuthView.vue'),
            beforeEnter: (to, from) => {
                if (isAuthenticated()) {
                    return { name: 'home' };
                } else {
                    return true;
                }
            },
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/auth/RegisterView.vue'),
            beforeEnter: () => {
                if (isAuthenticated()) {
                    return { name: 'home' };
                } else {
                    return true;
                }
            },
        },
        {
            path: '/contribute',
            name: 'contribute',
            component: () => import('../views/ContributeView.vue'),
        },
        {
            path: '/contribute/new/brand',
            name: 'contribute-brand',
            component: () => import('../views/submissions/SubmissionsBrandView.vue'),
        },
        {
            path: '/contribute/new/polish',
            name: 'contribute-polish',
            component: () => import('../views/submissions/SubmissionsPolishView.vue'),
        },
        {
            path: '/contribute/new/dupe',
            name: 'contribute-dupe',
            component: () => import('../views/submissions/SubmissionDupeView.vue'),
            // todo: add authentication
        },
        {
            path: '/account',
            name: 'user-profile',
            component: () => import('../views/UserProfileView.vue'),
            beforeEnter: () => {
                if (isAuthenticated()) {
                    return true;
                } else {
                    return { name: 'auth' };
                }
            },
        },
        {
            path: '/wishlist',
            name: 'wishlist',
            component: () => import('../views/WishListView.vue'),
            beforeEnter: (to, from) => {
                if (isAuthenticated()) {
                    return true;
                } else {
                    return { name: 'auth' };
                }
            },
        },
        {
            path: '/my-collection',
            name: 'collection',
            component: () => import('../views/CollectionView.vue'),
            beforeEnter: () => {
                if (isAuthenticated()) {
                    return true;
                } else {
                    return { name: 'auth' };
                }
            },
        },
        {
            path: '/submissions',
            name: 'submissions',
            component: () => import('../views/submissions/SubmissionsView.vue'),
            beforeEnter: () => {
                if (isAuthenticated()) {
                    return true;
                } else {
                    return { name: 'auth' };
                }
            },
        },
        {
            path: '/search/dupes',
            name: 'find-dupe',
            component: () => import('../views/FindDupeView.vue'),
        },
        {
            path: '/verify/',
            name: 'verify',
            component: () => import('../views/auth/VerifyAccountView.vue'),
            beforeEnter: () => {
                if (isAuthenticated()) {
                    return { name: 'home' };
                } else {
                    return true;
                }
            },
        },
        {
            path: '/resend-verification',
            name: 'resend-verification',
            component: () => import('../views/auth/ResendVerificationView.vue'),
            beforeEnter: () => {
                if (isAuthenticated()) {
                    return { name: 'home' };
                } else {
                    return true;
                }
            },
        },
        {
            path: '/missing-verification',
            name: 'missing-verification',
            component: () => import('../views/auth/UserNotVerifiedView.vue'),
            beforeEnter: () => {
                if (isAuthenticated()) {
                    return { name: 'home' };
                } else {
                    return true;
                }
            },
        },
        {
            path: '/password-reset',
            name: 'password-reset',
            component: () => import('../views/auth/PasswordResetView.vue'),
            beforeEnter: () => {
                if (isAuthenticated()) {
                    return { name: 'home' };
                } else {
                    return true;
                }
            },
        },
        {
            path: '/reset-password/:token?',
            name: 'password-reset-token',
            component: () => import('../views/auth/NewPasswordView.vue'),
            beforeEnter: () => {
                if (isAuthenticated()) {
                    return { name: 'home' };
                } else {
                    return true;
                }
            },
        },
        {
            path: '/admin',
            name: 'admin-homepage',
            component: () => import('@/views/admin-tools/AdminHomePage.vue'),
            beforeEnter: () => {
                if (isAuthenticated()) {
                    return true;
                } else {
                    return { name: 'home' };
                }
            },
        },
        {
            path: '/admin/db',
            name: 'admin-db',
            component: () => import('@/views/admin-tools/DatabaseView.vue'),
            beforeEnter: () => {
                if (isAuthenticated()) {
                    return true;
                } else {
                    return { name: 'home' };
                }
            },
        },
        {
            path: '/admin/roles',
            name: 'admin-roles',
            component: () => import('@/views/admin-tools/RoleAssignments.vue'),
            beforeEnter: () => {
                if (isAuthenticated()) {
                    return true;
                } else {
                    return { name: 'home' };
                }
            },
        },
        {
            path: '/admin/submissions/brands',
            name: 'admin-submissions-brands',
            component: () => import('@/views/admin-tools/BrandSubmissionsView.vue'),
            beforeEnter: () => {
                if (isAuthenticated()) {
                    return true;
                } else {
                    return { name: 'home' };
                }
            },
        },
        {
            path: '/admin/submissions/dupes',
            name: 'admin-submissions-dupes',
            component: () => import('@/views/admin-tools/DupeSubmissionsView.vue'),
            beforeEnter: () => {
                if (isAuthenticated()) {
                    return true;
                } else {
                    return { name: 'home' };
                }
            },
        },
        {
            path: '/admin/submissions/polish',
            name: 'admin-submissions-polish',
            component: () => import('@/views/admin-tools/PolishSubmissionsView.vue'),
            beforeEnter: () => {
                if (isAuthenticated()) {
                    return true;
                } else {
                    return { name: 'home' };
                }
            },
        },
        {
            path: '/admin/feedback',
            name: 'admin-feedback',
            component: () => import('@/views/admin-tools/UserFeedback.vue'),
            beforeEnter: () => {
                if (isAuthenticated()) {
                    return true;
                } else {
                    return { name: 'home' };
                }
            },
        },
        // catch all fallback route
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('../views/NotFoundView.vue'),
        },
    ],
});

export default router;
