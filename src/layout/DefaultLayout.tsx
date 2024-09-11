import React, { useState, ReactNode, useEffect } from 'react';
import Header from '../components/Header/index';
import Ship from '../components/Header/Shipment';
import Sidebar from '../components/Sidebar/index';
import CollapsibleExample from '../Test/NavBarTest';
import SuccessfullyToast from '../components/Toast/successfullyToast';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import { showToast, hideToast } from '../state/Slices/ToastSlice';

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const display = useSelector((state: RootState) => state.Toast.display);
  console.log("this is the display value : "+display);
  useEffect(() => {
    if (display) {
      const timeout = setTimeout(() => {
        dispatch(hideToast());
      }, 2000);

      // Clear timeout on component unmount or when toast is hidden manually
      return () => clearTimeout(timeout);
    }
  }, [dispatch, display]);
  return (
    
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        
        {/* <!-- ===== Sidebar Start ===== --> */}
        {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">

          {/* <!-- ===== Header Start ===== --> */}
          <div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 9999 }}>
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          </div>
          <div style={{ position: 'fixed', top: '95px', width: '100%', zIndex: 9998 }}>
            <CollapsibleExample />
          </div>
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            {display && <SuccessfullyToast message="loged in successfully"/>}
          
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10" style={{ marginTop: "160px", backgroundColor: "#EBF2F3	", width: "90%", border: "2px solid transparent", borderRadius: "8px" }}>
              {children}
            </div>

          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DefaultLayout;
