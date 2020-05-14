import router from "./router/index";
import store from "./store/index";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/pages/login"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start();

    // set page title
    document.title = getPageTitle(to.name);
    // determine whether the user has logged in
    const token = getToken();
    if (token) {
        if (to.path === "/pages/login") {
            // if is logged in, redirect to the home page
            next({ path: "/" });
            NProgress.done();
        } else if (to.path === "/logout") {
            store
                .dispatch("user/logout")
                .then(res => {
                    next({ path: "/pages/login" });
                })
                .catch(error => next({ path: "/pages/login" }));
        } else {
            //determine whether the user has obtained his permission roles through getInfo
            const hasRoles =
                store.getters.roles && store.getters.roles.length > 0;
            if (hasRoles) {
                next();
            } else {
                try {
                    // get user info
                    // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
                    const { routes } = await store.dispatch("user/getInfo");
                    // store.dispatch("permission/getPermissions", menus);
                    // generate accessible routes map based on roles

                    const accessRoutes = await store.dispatch(
                        "permission/generateRoutes",
                        routes
                    );
                    // store.commit("permission/SET_PERMISSIONS");
                    // // dynamically add accessible routes
                    router.addRoutes(accessRoutes);
                    // hack method to ensure that addRoutes is complete
                    // set the replace: true, so the navigation will not leave a history record
                    next({ path: to.path });
                } catch (error) {
                    // remove token and go to login page to re-login
                    // await store.dispatch("user/resetToken");
                    // Message.error(error || "Has Error");
                    // next(`/login?redirect=${to.path}`);
                    // NProgress.done();
                }
            }
            next();
            NProgress.done();
        }
    } else {
        /* has no token*/

        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next();
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            // if (to.path != "/home") next(`/account/login?redirect=${to.path}`);
            //else
            next("/pages/login");
        }
    }
});

router.afterEach(() => {
    // finish progress bar
    NProgress.done();
});
