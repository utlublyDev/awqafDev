import React from "react";
import { Translate, translate, ValidatedField } from "react-jhipster";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  Row,
  Col,
  Form,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export interface ILoginModalProps {
  showModal: boolean;
  loginError: boolean;
  handleLogin: (
    username: string,
    password: string,
    rememberMe: boolean
  ) => void;
  handleClose: () => void;
}

const LoginModal = (props: ILoginModalProps) => {
  const login = ({ username, password, rememberMe }) => {
    props.handleLogin(username, password, rememberMe);
  };

  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({ mode: "onTouched" });

  const { loginError, handleClose } = props;

  const handleLoginSubmit = (e) => {

    handleSubmit(login)(e);
  
    
  };

  return (
    <div className="relative bg-white h-screen">

      <div className="relative z-10 pb-8 bg-gray-100 sm:pb-16 md:pb-20 lg:max-w-sm lg:w-full lg:pb-28 xl:pb-32 h-screen grid place-items-center  ">




        <main className="    mx-auto max-w-1/4 px-4 sm:mt-0 sm:px-6 md:mt-0 lg:mt-0 lg:px-8 xl:mt-0 flex    ">
          <div className="text-center ">
            <h5 className="text-xl tracking-tight font-extrabold text-gray-900 sm:text-xl md:text-xl">
              <span className="block xl:inline">لوحة تحكم برنامج  </span>{' '}

            </h5>

            <div className="mt-2 sm:mt-2 sm:flex sm:justify-center lg:justify-start">

              <img

src={"../../../content/images/logos.png"} alt="Logo"  className="w-40	"/>
            </div>

          </div>

        </main>




      </div>

      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-full ">
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
          <div className="max-w-md w-full space-y-8 ml-15">
            <div>
              <img
                className="mx-auto "
                src="../../../content/images/awqafLogo.png"
                alt="Workflow"
              />
              <h2 className="mt-10 text-center text-2xl font-extrabold text-gray-900">تسجيل الدخول</h2>
              <p className="mt-2 text-center text-sm text-gray-600">

              </p>
            </div>
            <Form className="mt-8 space-y-6 " onSubmit={handleLoginSubmit}>

              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md  -space-y-px ">
                <div className="flex justify-center">

                  <ValidatedField className="mt-5"
                    name="username"

                    placeholder={"البريد الإلكتروني"}
                    required
                    autoFocus
                    data-cy="username"
                    // validate={{ required: "Username cannot be empty!" }}
                    register={register}
                    error={errors.username}
                    isTouched={touchedFields.username}

                  />






                </div>
                <div className="flex justify-center">

                  <ValidatedField className="mt-5"
                    name="password"
                    type="password"

                    placeholder={"كلمة المرور"}
                    required
                    data-cy="password"
                    // validate={{ required: "Password cannot be empty!" }}
                    register={register}
                    error={errors.password}
                    isTouched={touchedFields.password}

                  />

                </div>
              </div>
              {/* 
        <div className="flex items-center justify-between  	">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            ؟ نسيت كلمة المرور
            </a>
          </div>
        </div> */}

              <div className="flex justify-center">
                <button style={{ backgroundColor: '#827349', }}
                  type="submit"
                  className="group relative w-4/6 flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 "
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">

                  </span>
                  تسجيل الدخول
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>

  );
};

export default LoginModal;
