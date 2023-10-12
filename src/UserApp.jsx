import { Provider } from "react-redux"
import { AppRoutes } from "./AppRoutes"
import { store } from "./store/store"


export const UserApp = () => {
    return(
        //le pasamos al provider el store donde estan nuestros reducers
        <Provider store={store}>
            <AppRoutes/>
        </Provider>
    )
}