import {useAuthState} from "../../context/auth.context";
import {Route} from "react-router-dom";
import {LoginRequired} from "../../pages"

const AuthenticatedRoute = ({component: C, ...props}) => {
    const {isAuthenticated} = useAuthState()
    console.log(`AuthenticatedRoute: ${isAuthenticated}`)
    return (
        <Route
            {...props}
            render={routeProps =>
                isAuthenticated ? <C {...routeProps} /> : <LoginRequired/>
            }
        />
    )
}
export default AuthenticatedRoute