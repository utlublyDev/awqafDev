import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";


function SideNavbar() {
  return (
    < div >

      <Disclosure as="nav" >
      {/* <Disclosure.Button className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-[#827349]  hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
  <GiHamburgerMenu
    className="block md:hidden h-6 w-6"
    aria-hidden="true"
  />
</Disclosure.Button> */}
        <div className="p-6 w-1/2 h-screen bg-white z-20 fixed top-0 -right-96 lg:right-0 lg:w-64 peer-focus:right-0 peer:transition ease-out delay-150 duration-200">
          <div className="flex flex-col justify-end item-center">
            <div className="flex justify-center item-center ">

              <img

                src={"../../../content/images/logos.png"} alt="Logo" className="w-36" />
            </div>
            <div className="	flex justify-center item-center my-4 border-b border-gray-100 pb-4">
              <span className="text-sm">لوحة تحكم المسؤول</span>
            </div>
            <div>
              <a href="/dashboard" className="flex mb-2 justify-end items-center gap-4 pl-5 hover:bg-[#827349]  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <h5   className="text-base text-gray-600 group-hover:text-white font-light ">
                  التقرير
                </h5>
             

                <svg id="_01_align_center" data-name="01 align center" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className="text-2xl text-gray-600 group-hover:text-white mr-4 ">
                  <path id="Path_5" data-name="Path 5" d="M20,20H2.5A2.5,2.5,0,0,1,0,17.5V0H1.667V17.5a.833.833,0,0,0,.833.833H20Z" fill="#909090" />
                  <rect id="Rectangle_106" data-name="Rectangle 106" width="1.667" height="7.5" transform="translate(11.667 9.167)" fill="#909090" />
                  <rect id="Rectangle_107" data-name="Rectangle 107" width="1.667" height="7.5" transform="translate(5 9.167)" fill="#909090" />
                  <rect id="Rectangle_108" data-name="Rectangle 108" width="1.667" height="11.667" transform="translate(15 5)" fill="#909090" />
                  <rect id="Rectangle_109" data-name="Rectangle 109" width="1.667" height="11.667" transform="translate(8.333 5)" fill="#909090" />
                </svg>



              </a>
              <a href="/contract" className="flex  mb-2 justify-end items-center gap-4 pl-5 hover:bg-[#827349]  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <h5 className="text-base text-gray-600 group-hover:text-white font-light ">
                  العقود
                </h5>

                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" viewBox="0 0 15 20" className="text-2xl text-gray-600 group-hover:text-white   mr-4 ">
                  <path id="menu02-contracts" d="M18,5.2a3.313,3.313,0,0,0-.977-2.357L15.155.977A3.352,3.352,0,0,0,12.8,0H5.5A2.5,2.5,0,0,0,3,2.5V20H18ZM15.845,4.023a1.6,1.6,0,0,1,.117.143H13.833V2.037a1.6,1.6,0,0,1,.143.117ZM4.667,18.333V2.5A.833.833,0,0,1,5.5,1.667h6.667V5.833h4.167v12.5ZM7.167,7.5h6.667V9.167H7.167Zm0,3.333h6.667V12.5H7.167Zm5.015,3.178,1.637.3c-.159.873-.837,2.35-2.373,2.35a2.628,2.628,0,0,1-1.655-.588c-.262-.186-.353-.245-.552-.245a1.817,1.817,0,0,0-.763.55l-1.25-1.1a3.124,3.124,0,0,1,2.013-1.119,2.437,2.437,0,0,1,1.517.553,1.029,1.029,0,0,0,.689.28c.519,0,.733-.977.736-.988Z" transform="translate(-3)" fill="#909090" />
                </svg>
              </a>


              <a href="/new-company"    className="flex  mb-2 justify-end items-center gap-4 pl-5 hover:bg-[#827349]  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">

<h5 className="text-base text-gray-600 group-hover:text-white font-light ">  شركات </h5>

<svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" viewBox="0 0 15 20" className="text-2xl text-gray-600 group-hover:text-white   mr-4 ">
  <path id="menu02-contracts" d="M18,5.2a3.313,3.313,0,0,0-.977-2.357L15.155.977A3.352,3.352,0,0,0,12.8,0H5.5A2.5,2.5,0,0,0,3,2.5V20H18ZM15.845,4.023a1.6,1.6,0,0,1,.117.143H13.833V2.037a1.6,1.6,0,0,1,.143.117ZM4.667,18.333V2.5A.833.833,0,0,1,5.5,1.667h6.667V5.833h4.167v12.5ZM7.167,7.5h6.667V9.167H7.167Zm0,3.333h6.667V12.5H7.167Zm5.015,3.178,1.637.3c-.159.873-.837,2.35-2.373,2.35a2.628,2.628,0,0,1-1.655-.588c-.262-.186-.353-.245-.552-.245a1.817,1.817,0,0,0-.763.55l-1.25-1.1a3.124,3.124,0,0,1,2.013-1.119,2.437,2.437,0,0,1,1.517.553,1.029,1.029,0,0,0,.689.28c.519,0,.733-.977.736-.988Z" transform="translate(-3)" fill="#909090"/>
</svg>

</a>
              <a href="/providers" className="flex  mb-2 justify-end items-center gap-4 pl-5 hover:bg-[#827349]  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">

                <h5 className="text-base text-gray-600 group-hover:text-white font-light ">مقدمي الخدمة</h5>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className="text-2xl text-gray-600 group-hover:text-white  mr-4 ">
                  <path id="menu03-providers" d="M5.291,9.167H2.5A.833.833,0,0,0,1.667,10v2.5H0V10A2.5,2.5,0,0,1,2.5,7.5H6.281a4.981,4.981,0,0,0-.99,1.667ZM17.5,7.5H13.719a4.981,4.981,0,0,1,.99,1.667H17.5a.833.833,0,0,1,.833.833v2.5H20V10A2.5,2.5,0,0,0,17.5,7.5Zm-4.167,3.333A3.333,3.333,0,1,0,10,14.167,3.333,3.333,0,0,0,13.333,10.833Zm-1.667,0A1.667,1.667,0,1,1,10,9.167,1.667,1.667,0,0,1,11.667,10.833ZM15,17.5A2.5,2.5,0,0,0,12.5,15h-5A2.5,2.5,0,0,0,5,17.5V20H6.667V17.5a.833.833,0,0,1,.833-.833h5a.833.833,0,0,1,.833.833V20H15ZM18.333,3.333A3.333,3.333,0,1,0,15,6.667a3.333,3.333,0,0,0,3.333-3.333Zm-1.667,0A1.667,1.667,0,1,1,15,1.667,1.667,1.667,0,0,1,16.667,3.333Zm-8.333,0A3.333,3.333,0,1,0,5,6.667,3.333,3.333,0,0,0,8.333,3.333Zm-1.667,0A1.667,1.667,0,1,1,5,1.667,1.667,1.667,0,0,1,6.667,3.333Z" fill="#909090" />
                </svg>

              </a>
              <a href="/providers-categories"     className="flex  mb-2 justify-end items-center gap-4 pl-5 hover:bg-[#827349]  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">

                <h5 className="text-base text-gray-600 group-hover:text-white font-light ">فئات مقدم الخدمة</h5>

                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="17.417" viewBox="0 0 19 17.417" className="text-2xl text-gray-600 group-hover:text-white   mr-4 ">
                  <g id="_01_align_center" data-name="01 align center" transform="translate(0 -1)">
                    <path id="Path_6" data-name="Path 6" d="M16.625,2.583H9.687L6.52,1H2.375A2.375,2.375,0,0,0,0,3.375V18.417H19V4.958A2.375,2.375,0,0,0,16.625,2.583Zm-14.25,0H6.146L9.313,4.167h7.312a.792.792,0,0,1,.792.792V7.165L1.583,7.254V3.375a.792.792,0,0,1,.792-.792Zm-.792,14.25v-8l15.833-.089v8.085Z" transform="translate(0)" fill="#909090" />
                  </g>
                </svg>

              </a>


              <a href="/offers-categories"    className="flex  mb-2 justify-end items-center gap-4 pl-5 hover:bg-[#827349]  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">

              <h5 className="text-base text-gray-600 group-hover:text-white font-light ">فئات  العروض</h5>

<svg xmlns="http://www.w3.org/2000/svg" width="19" height="17.417" viewBox="0 0 19 17.417" className="text-2xl text-gray-600 group-hover:text-white   mr-4 ">
  <g id="_01_align_center" data-name="01 align center" transform="translate(0 -1)">
    <path id="Path_6" data-name="Path 6" d="M16.625,2.583H9.687L6.52,1H2.375A2.375,2.375,0,0,0,0,3.375V18.417H19V4.958A2.375,2.375,0,0,0,16.625,2.583Zm-14.25,0H6.146L9.313,4.167h7.312a.792.792,0,0,1,.792.792V7.165L1.583,7.254V3.375a.792.792,0,0,1,.792-.792Zm-.792,14.25v-8l15.833-.089v8.085Z" transform="translate(0)" fill="#909090" />
  </g>
</svg>

</a>










              <a href="/offers" className="flex  mb-2 justify-end items-center gap-4 pl-5 hover:bg-[#827349]  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <h5 className="text-base text-gray-600 group-hover:text-white font-light ">الخصومات</h5>


                <svg xmlns="http://www.w3.org/2000/svg" width="14.143" height="20" viewBox="0 0 14.143 20" className="text-2xl text-gray-600 group-hover:text-white   mr-4 ">
                  <path id="menu05-discounts" d="M11.143,20H7.937L9.6,13.333H6.159a2.134,2.134,0,0,1-2.043-2.75L7.318,0h7.889l-2.5,6.667h3.352a2.111,2.111,0,0,1,1.758,3.277Zm-1.071-1.667h.177l6.18-9.312a.443.443,0,0,0-.369-.688H10.3l2.5-6.667H8.554l-2.842,9.4a.467.467,0,0,0,.448.6h5.583Z" transform="translate(-4.026)" fill="#909090" />
                </svg>

              </a>
              <a href="/reviews-and-rating" className="flex  mb-2 justify-end items-center gap-4 pl-5 hover:bg-[#827349]  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">

                <h5 className="text-base text-gray-600 group-hover:text-white font-light "> التقيمات</h5>


                <svg xmlns="http://www.w3.org/2000/svg" width="20.283" height="19" viewBox="0 0 20.283 19" className="text-2xl text-gray-600 group-hover:text-white   mr-4 " >
                  <path id="Union_1" data-name="Union 1" d="M10.149,20a1.7,1.7,0,0,1-1.131-.43L5.851,16.9H0V3.535A2.535,2.535,0,0,1,2.535,1H17.748a2.535,2.535,0,0,1,2.535,2.535V16.9H14.492L11.24,19.59a1.639,1.639,0,0,1-1.083.41ZM1.69,3.535V15.213H6.468l3.656,3.08,3.76-3.08h4.709V3.535a.846.846,0,0,0-.845-.845H2.535A.845.845,0,0,0,1.69,3.535ZM15.344,10.4l-1.1.8-.506-.367.422-1.3-1.105-.8.194-.595h1.366l.423-1.3.622,0,.422,1.3h1.366l.194.595-1.105.8.423,1.3-.507.367Zm-5.206,0-1.1.8-.506-.367.422-1.3-1.105-.8.194-.595H9.409l.422-1.3.623,0,.422,1.3h1.366l.194.595-1.105.8.422,1.3-.506.367Zm-5.207,0-1.1.8-.507-.367.423-1.3-1.105-.8.194-.595H4.2l.422-1.3.622,0,.423,1.3H7.036l.194.595-1.105.8.422,1.3-.506.367Z" transform="translate(0 -1)" fill="#909090" />
                </svg>

              </a>



    








            </div>
            {/* setting  */}
            <div >
              <a href="/frequently-asked-questions" className="flex mb-2 justify-end items-center gap-4  hover:bg-[#827349]  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <h5 className="text-base text-gray-600 group-hover:text-white font-light "> ادارة الاسئلة الشائعة</h5>

                <svg xmlns="http://www.w3.org/2000/svg" width="19.98" height="20" viewBox="0 0 19.98 20" className="text-2xl text-gray-600 group-hover:text-white   mr-4 " >
                  <g id="_01_align_center" data-name="01 align center" transform="translate(-0.024 0)">
                    <path id="Path_9" data-name="Path 9" d="M20,20H10.019A10,10,0,1,1,20,9.372V20ZM10.019,1.667a8.333,8.333,0,0,0,0,16.667h8.318V9.451A8.348,8.348,0,0,0,10.019,1.667Z" transform="translate(0 0)" fill="#909090" />
                    <rect id="Rectangle_110" data-name="Rectangle 110" width="5" height="1.667" transform="translate(5.837 5.833)" fill="#909090" />
                    <rect id="Rectangle_111" data-name="Rectangle 111" width="8.333" height="1.667" transform="translate(5.837 9.167)" fill="#909090" />
                    <rect id="Rectangle_112" data-name="Rectangle 112" width="8.333" height="1.667" transform="translate(5.837 12.5)" fill="#909090" />
                  </g>
                </svg>
              </a>




              <a href="/push-notifications"    className="flex  mb-2 justify-end items-center gap-4 pl-5 hover:bg-[#827349]  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">

<h5 className="text-base text-gray-600 group-hover:text-white font-light "> ارسال تنبيهات </h5>

<svg  className="text-2xl text-gray-600 group-hover:text-white mr-4" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#909090" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path></svg>

</a>






              <a href="/complaint"    className="flex  mb-2 justify-end items-center gap-4 pl-5 hover:bg-[#827349]  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">

<h5 className="text-base text-gray-600 group-hover:text-white font-light ">  طلبات دعم </h5>


<svg className="text-2xl text-gray-600 group-hover:text-white mr-4" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#909090" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>

</a>


              <a  href="/account/settings" className="flex mb-2 justify-end items-center gap-4 pl-5 hover:bg-[#827349] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <h5 className="text-base text-gray-600 group-hover:text-white font-light ">معلومات الشخصية</h5>

                <svg xmlns="http://www.w3.org/2000/svg" width="18.333" height="20" viewBox="0 0 18.333 20" className="text-2xl text-red-600 group-hover:text-red   mr-4 ">
                  <path id="menu08-contact_info" d="M16.833,0H2.667V2.5H1V4.167H2.667V5.833H1V7.5H2.667V9.167H1v1.667H2.667V12.5H1v1.667H2.667v1.667H1V17.5H2.667V20H16.833a2.5,2.5,0,0,0,2.5-2.5V2.5A2.5,2.5,0,0,0,16.833,0Zm.833,17.5a.833.833,0,0,1-.833.833H4.333V1.667h12.5a.833.833,0,0,1,.833.833ZM11,10A2.5,2.5,0,1,0,8.5,7.5,2.5,2.5,0,0,0,11,10Zm4.167,3.333V15H13.5V13.333a.833.833,0,0,0-.833-.833H9.333a.833.833,0,0,0-.833.833V15H6.833V13.333a2.5,2.5,0,0,1,2.5-2.5h3.333A2.5,2.5,0,0,1,15.167,13.333Z" transform="translate(-1)" fill="#909090" />
                </svg>



              </a>
            </div>
            {/* logout */}
            <a href="/logout"  className=" my-4">
              <div className="flex mb-2 justify-end items-center gap-4 pl-5 border border-gray-200  hover:bg-[#827349] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <h5 className="text-base text-gray-600 group-hover:text-white font-light ">   تسجيل خروج </h5>


                <svg id="logout" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" className="text-2xl text-gray-600 group-hover:text-white   mr-4 ">
                  <path id="Path_11" data-name="Path 11" d="M1.333,14V2A.667.667,0,0,1,2,1.333H5.333V0H2A2,2,0,0,0,0,2V14a2,2,0,0,0,2,2H5.333V14.666H2A.667.667,0,0,1,1.333,14Z" transform="translate(0)" fill="#909090" />
                  <path id="Path_12" data-name="Path 12" d="M17.082,8.35,14.025,5.293l-.943.943,2.843,2.843L5,9.1v1.333l10.962-.019-2.881,2.881.943.943,3.057-3.057A2,2,0,0,0,17.082,8.35Z" transform="translate(-1.667 -1.764)" fill="#909090" />
                </svg>

              </div>
            </a>
            <a href="https://www.engineeric.qa" className=" text-xs text-center text-gray-500">© Engineeric Software Solutions</a>
          </div>
        </div>
      </Disclosure>
      
    </div>
  );
}

export default SideNavbar;
7