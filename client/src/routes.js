import {
    ADMIN_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    MYPRINTERS_ROUTE,
    PRINTER_ROUTE,
    REGISTRATION_ROUTE
} from "./utils/consts";
import MyPrinters from "./pages/MyPrinters";
import Auth from "./pages/Auth";
import PrinterPage from "./pages/PrinterPage";
import Admin from "./pages/Admin";
import Main from "./pages/Main";


export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: MYPRINTERS_ROUTE,
        Component: MyPrinters
    },
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: PRINTER_ROUTE + '/:id',
        Component: PrinterPage
    },
]