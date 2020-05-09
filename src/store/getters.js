const getters = {
    barColor: state => state.app.barColor,
    barImage: state => state.app.barImage,
    drawer: state => state.app.drawer,
    snackbarShow: state => state.app.snackbarShow,
    snackbarText: state => state.app.snackbarText,
    snackbarType: state => state.app.snackbarType,
    token: state => state.user.token,
    id: state => state.user.id,
    // avatar: state => state.user.avatar,
    name: state => state.user.name,
    username: state => state.user.username,
    roles: state => state.user.roles,
    menus: state => state.user.menus,
    routes: state => state.user.routes,
    phone_number: state => state.user.phone_number,
    // position: state => state.user.position,
    // department: state => state.user.department,
    email: state => state.user.email,
    home_url: state => state.user.home_url
    // tiny_drive_token: state => state.user.tiny_drive_token
};
export default getters;
