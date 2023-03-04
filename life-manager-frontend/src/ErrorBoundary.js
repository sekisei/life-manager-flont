import React from "react";
import Login from "./components/Login";

//TODO catch処理見直し
class ErrorBoundary extends React.Component{
    constructor(props){
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
      }

    componentDidCatch(error, errorInfo){
        console.log(error, errorInfo);
    }
    
    componentDidMount() {
        window.addEventListener("unhandledrejection", this.onUnhandledRejection);
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.onUnhandledRejection);
    }

    onUnhandledRejection = (e) => {
        e.promise.catch((error) => {
            this.setState(ErrorBoundary.getDerivedStateFromError(error));
        });
    }

    render(){
        if(this.state.hasError){
            <Login/>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;