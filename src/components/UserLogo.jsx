import React from 'react'
import { Button, Dropdown } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import { setUser } from '../reducers/userReducer';
import { API_KEY_3, API_URL, endPoints, fetchApi } from '../config/config';

const cookies = new Cookies();

const UserLogo = ({ user }) => {
    const dispatch = useDispatch();

    const logout = () => {
        const session_id = cookies.get("session_id");
        fetchApi(`${API_URL}${endPoints.deleteSession}?api_key=${API_KEY_3}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                session_id
            })
        })
        cookies.remove('session_id');
        dispatch(setUser(null));
    }

    return (
        <Dropdown>
            <Dropdown.Toggle>
                <img className="rounded-circle"
                    width="40"
                    src={`https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}.jpg?s=64`}
                    alt={user.username} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item as={Button} onClick={logout}>Выйти</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default UserLogo