import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function currentUser() {
    if (!cookies.get('user')) {
        return null;
    } else {
        return cookies.get('user');
    }
}

export function logIn(user) {
    cookies.set("user", user, {
        path: "/",
        maxAge: 3600,
        sameSite: true,
    });
}

export function logOut() {
    cookies.remove("user");
}
