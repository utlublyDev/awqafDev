import React, { useLayoutEffect } from "react";

import { useAppDispatch, useAppSelector } from "app/config/store";
import { logout } from "app/shared/reducers/authentication";

export const Logout = () => {
  const logoutUrl = useAppSelector((state) => state.authentication.logoutUrl);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(logout());
    if (logoutUrl) {
      window.location.href = logoutUrl;
    }
  });

  return (
    <div className="bg-white h-full">
    <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:tracking-tight">
        <span className="block">تم تسجيل الخروج بنجاح</span>
      </h2>
      <div className="mt-8 flex justify-center">
        <div className="inline-flex rounded-md shadow">
          <a
            href="/login"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#827349] hover:bg-[#827349]"
          >
الذهاب إلى صفحة تسجيل الدخول        
  </a>
        </div>
 
      </div>
    </div>
  </div>
  );
};

export default Logout;
