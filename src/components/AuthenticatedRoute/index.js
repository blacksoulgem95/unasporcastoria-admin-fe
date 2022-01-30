import {useAuthState} from "../../context/auth.context";
import {LoginRequired} from "../../pages"

const AuthenticatedRoute = ({component: C, ...props}) => {
    const {isAuthenticated} = useAuthState()
    console.log(`AuthenticatedRoute: ${isAuthenticated}`)

    if (isAuthenticated) return <C {...props} />
    else return <LoginRequired />

}
export default AuthenticatedRoute