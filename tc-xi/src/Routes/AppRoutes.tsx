import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function AppRoutes(){

    return(
        <Router>
            <Suspense fallback={<h1>loading...</h1>}>
            <Routes>
                <Route path="*" element={<h1>404</h1>} />
            </Routes>
            </Suspense>
        </Router>
    )
}