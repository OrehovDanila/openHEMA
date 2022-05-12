import { Link } from "react-router-dom";

const Page404 = () => {
    return(
        <div>    
            <h1>404</h1>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Page doesn't exixt</p>
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}} to="/">Back to main page</Link>
        </div>
    )
}

export default Page404;