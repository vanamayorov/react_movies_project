import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap'
import { endPoints } from '../config/config';
import ApiService from '../API/ApiService';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, setUser } from '../reducers/userReducer';
import Cookies from 'universal-cookie';
import UserLogo from './UserLogo';
import { useForm } from "react-hook-form";

const cookies = new Cookies();

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const [show, setShow] = useState(false);
    const handleClose = () => {
        clearErrors();
        setShow(false)
    };
    const handleShow = () => setShow(true);
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: {
            errors,
            isDirty,
            isValid },
        clearErrors
    } = useForm({
        mode: 'onBlur',
        defaultValues: {
            login: "",
            password: "",
        }
    });

    const handleForm = (inputData) => {
        ApiService.get(endPoints.getToken)
            .then(data => {
                return ApiService.post(endPoints.validateWithLogin, {
                    body: {
                        username: inputData.login,
                        password: inputData.password,
                        request_token: data.request_token
                    }
                })
            })
            .then(data => {
                return ApiService.post(endPoints.getSession, {
                    body: {
                        request_token: data.request_token
                    }
                })
            })
            .then(data => {
                cookies.set("session_id", data.session_id, {
                    path: "/",
                    maxAge: 2592000
                });

                return ApiService.get(endPoints.account, {
                    params: {
                        session_id: data.session_id
                    }
                })
            })
            .then(data => {
                dispatch(setUser(data));
                reset();
                handleClose();
            })
            .catch(data => {
                setError('authError', { type: 'custom', message: data.status_message });
            });
    }

    return (
        <header>
            <nav className="navbar navbar-dark bg-primary sticky">
                <div className="container">
                    <a className="navbar-brand" href="/">Сайт с фильмами</a>
                    {user
                        ? <UserLogo user={user} />
                        :
                        <Button variant="success" onClick={handleShow}>
                            Войти
                        </Button>
                    }

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Авторизация</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form noValidate onSubmit={handleSubmit(handleForm)}>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Введите логин"
                                        {...register("login", { required: true })}
                                        isInvalid={!!errors.login}
                                    />
                                    {!!errors.login && <span className='error-validation'>This field is required</span>}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="password"
                                        placeholder="Введите пароль"
                                        {...register("password", { required: true })}
                                        isInvalid={!!errors.password}
                                    />
                                    {!!errors.password && <span className='error-validation'>This field is required</span>}
                                </Form.Group>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={!isValid || !isDirty}
                                    onClick={() => clearErrors(['authError'])}
                                >
                                    Войти
                                </Button>
                                <div className='error-validation text-center mt-2'>
                                    {!!errors.authError && errors?.authError?.message}
                                </div>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </div>
            </nav>
        </header>
    )
}

export default Header;