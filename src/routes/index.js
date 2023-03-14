import React, { Suspense, lazy } from 'react';
import { withCookies } from "react-cookie";
import { Navigate, Route, Routes } from 'react-router-dom';
const Dashboard = lazy(() => import("../component/dashboard"));

const MasterComponent = ({ cookies }) => {
    const token = cookies.get("token");
    return (
        <>
            <Suspense>
                {token ? (
                    <main className='private-main'>
                        <div className='private-container'>
                            <Routes>
                                <Route path='*' element={<Navigate replace to='/' />} />
                            </Routes>
                        </div>
                    </main>
                ) : (
                    <main className='public-main'>
                        <div className='public-container'>
                            <Routes>
                                <Route path='/dashboard' element={<Dashboard />} />
                                <Route path='*' element={<Navigate replace to="/dashboard" />} />
                            </Routes>
                        </div>
                    </main>
                )}
            </Suspense>
        </>
    )
}
export default withCookies(MasterComponent);