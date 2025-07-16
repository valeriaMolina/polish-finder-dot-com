import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from '@/utils/authUtils';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/navbar/AboutView.vue';
import ExploreView from '../views/ExploreView.vue';
import BrandsView from '../views/BrandsView.vue';
import BrandView from '../views/BrandView.vue';
import PolishesView from '../views/PolishesView.vue';
import PolishView from '../views/PolishView.vue';
import AuthView from '../views/auth/AuthView.vue';
import RegisterView from '../views/auth/RegisterView.vue';
import ContributeView from '../views/ContributeView.vue';
import SubmissionsBrandView from '../views/submissions/SubmissionsBrandView.vue';
import SubmissionsPolishView from '../views/submissions/SubmissionsPolishView.vue';
import SubmissionDupeView from '../views/submissions/SubmissionDupeView.vue';
import UserProfileView from '../views/UserProfileView.vue';
import WishListView from '../views/WishListView.vue';
import CollectionView from '../views/CollectionView.vue';
import SubmissionsView from '../views/submissions/SubmissionsView.vue';
import FindDupeView from '../views/FindDupeView.vue';
import VerifyAccountView from '../views/auth/VerifyAccountView.vue';
import ResendVerificationView from '../views/auth/ResendVerificationView.vue';
import UserNotVerifiedView from '../views/auth/UserNotVerifiedView.vue';
import PasswordResetView from '../views/auth/PasswordResetView.vue';
import NewPasswordView from '../views/auth/NewPasswordView.vue';
import AdminHomePage from '@/views/admin-tools/AdminHomePage.vue';
import DatabaseView from '@/views/admin-tools/DatabaseView.vue';
import RoleAssignments from '@/views/admin-tools/RoleAssignments.vue';
import BrandSubmissionsView from '@/views/admin-tools/BrandSubmissionsView.vue';
import DupeSubmissionsView from '@/views/admin-tools/DupeSubmissionsView.vue';
import PolishSubmissionsView from '@/views/admin-tools/PolishSubmissionsView.vue';
import UserFeedback from '@/views/admin-tools/UserFeedback.vue';
import NotFoundView from '../views/NotFoundView.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/about',
        name: 'about',
        component: AboutView,
    },
    {
        path: '/explore',
        name: 'explore',
        component: ExploreView,
    },
    {
        path: '/brands',
        name: 'brands',
        component: BrandsView,
    },
    {
        path: '/brands/:brandId',
        name: 'brand',
        component: BrandView,
    },
    {
        path: '/polishes',
        name: 'polishes',
        component: PolishesView,
    },
    {
        path: '/polishes/:polishId',
        name: 'polish',
        component: PolishView,
    },
    {
        path: '/login',
        name: 'auth',
        component: AuthView,
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
        component: RegisterView,
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
        component: ContributeView,
    },
    {
        path: '/contribute/new/brand',
        name: 'contribute-brand',
        component: SubmissionsBrandView,
    },
    {
        path: '/contribute/new/polish',
        name: 'contribute-polish',
        component: SubmissionsPolishView,
    },
    {
        path: '/contribute/new/dupe',
        name: 'contribute-dupe',
        component: SubmissionDupeView,
    },
    {
        path: '/account',
        name: 'user-profile',
        component: UserProfileView,
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
        component: WishListView,
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
        component: CollectionView,
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
        component: SubmissionsView,
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
        component: FindDupeView,
    },
    {
        path: '/verify/',
        name: 'verify',
        component: VerifyAccountView,
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
        component: ResendVerificationView,
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
        component: UserNotVerifiedView,
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
        component: PasswordResetView,
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
        component: NewPasswordView,
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
        component: AdminHomePage,
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
        component: DatabaseView,
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
        component: RoleAssignments,
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
        component: BrandSubmissionsView,
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
        component: DupeSubmissionsView,
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
        component: PolishSubmissionsView,
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
        component: UserFeedback,
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
        component: NotFoundView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
