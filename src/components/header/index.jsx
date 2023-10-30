import { Container, Logo, Order } from "./styles";

import { PiReceipt, PiSignOutBold } from "react-icons/pi"
import { FiMenu } from "react-icons/fi"

import { SearchInput } from "../searchInput";

import logoHeader from "../../assets/logo-header.svg"

import { useNavigate } from "react-router-dom"

import { useAuth } from "../../hooks/auth";
import { useState, useEffect } from "react";

export function Header({ onClick }) {
    const { signOut, searchForMeal } = useAuth()

    const [ search, setSearch ] = useState("")

    const navigate = useNavigate()

    function handleRefresh() {
        navigate("/")
    }

    function handleSignOut() {
        navigate("/")
        signOut()
    }

    useEffect(() => {
        searchForMeal(search)
    }, [search])


    return(
        <Container>
                <FiMenu size={32} className="menu" onClick={onClick}/>
                <Logo className="logo" onClick={() => handleRefresh()}>
                    <img src={logoHeader} alt="Logo Food Explorer" />
                    <span>food explorer</span>
                </Logo>

                <SearchInput onChange={e => setSearch(e.target.value)}/>

                <div className="mobileOrder">
                    <PiReceipt size={32}/>
                    <span>0</span>
                </div>

                <Order className="order">
                    <PiReceipt size={32}/>
                    <span>Pedidos</span>
                    <span>(0)</span>
                </Order>

                <PiSignOutBold size={42} className="signOut" onClick={handleSignOut}/>
        </Container>
    )
}