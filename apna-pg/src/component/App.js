"use client"
import Header from "./Header";
import Footer from "./Footer";

export  const App = ({Children}) =>{
    return (
        <div>
            <Header/>
                {Children}
            <Footer/>
        </div>
    );
}