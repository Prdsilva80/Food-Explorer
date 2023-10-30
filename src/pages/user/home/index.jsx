import { Container, Brand, Section, Arrow } from "./styles";

import { Header } from "../../../components/header"
import { Footer } from "../../../components/footer"
import { MealCard } from "../../../components/MealCard"
import { UserMenu } from "../menu"

import image from "../../../assets/brand.png"

import { useRef, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/auth";
import { api } from "../../../services/api";

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export function Home() {
    const scrollMealList = useRef(null);
    const scrollDrinkList = useRef(null);
    const scrollDessertList = useRef(null);

    const paddingMeal = useRef(null);
    const paddingDrink = useRef(null);
    const paddingDessert = useRef(null);

    const menuPage = useRef(null)

    const { meals } = useAuth()

    const mealCategory = meals.filter((meal) => meal.category === "Refeição")
    const dessertCategory = meals.filter((meal) => meal.category === "Sobremesa")
    const drinkCategory = meals.filter((meal) => meal.category === "Bebida")

    const navigate = useNavigate()

    const [ favorite, setFavorite ] = useState(0)

    function showMeal(meal_id) {
        navigate(`/details/${meal_id}`)
    }

    const handlePrevMealList = () => {
        paddingMeal.current.id="padding"
        scrollMealList.current.scrollBy({
        left: -420,
        behavior: 'smooth'
        });
    }

    const handleNextMealList = () => {
        paddingMeal.current.id="padding"
        scrollMealList.current.scrollBy({
            left: 420,
            behavior: 'smooth'
        });
    }

    const handlePrevDrinkList = () => {
        paddingDrink.current.id="padding"
        scrollDrinkList.current.scrollBy({
        left: -420,
        behavior: 'smooth'
        });
    }

    const handleNextDrinkList = () => {
        paddingDrink.current.id="padding"
        scrollDrinkList.current.scrollBy({
        left: 420,
        behavior: 'smooth'
        });
    }

    const handlePrevDessertList = () => {
        paddingDessert.current.id="padding"
        scrollDessertList.current.scrollBy({
        left: -420,
        behavior: 'smooth'
        });
    }

    const handleNextDessertList = () => {
        paddingDessert.current.id="padding"
        scrollDessertList.current.scrollBy({
            left: 420,
            behavior: 'smooth'
        });
    }

    useEffect(() => {
        async function fetchFavorites() {
            const response = await api.get("/favorites")
            const data = response.data

            setFavorite(data.favorites.map(fav => (fav.meal_id)))
        }
        fetchFavorites()
    }, [])

    function openMenu() {
        menuPage.current.id="visible"
    }

    function closeMenu() {
        menuPage.current.id="not-visible"
    }

    return(
        <Container>
            <Header onClick={openMenu}/>
            <div className="mob" ref={menuPage}>
                <UserMenu onClick={closeMenu}/>
            </div>
            <main>

                <Brand className="brand">
                    <img src={image} alt="" />
                    <div>
                        <h2>Sabores inigualáveis</h2>
                        <span>Sinta o cuidado do preparo com ingredientes selecionados</span>
                    </div>
                </Brand>

                {
                    mealCategory.length ?
                    <Section ref={paddingMeal} className="section">
                        <h2>Refeições</h2>
                        <div ref={scrollMealList} className="meals">
                            {   
                                favorite &&
                                mealCategory.map(meal => (
                                    <MealCard 
                                        key={String(meal.id)}
                                        data={meal}
                                        favorite={favorite ? favorite.includes(meal.id) : false}
                                        onClick={() => showMeal(meal.id)}
                                    />
                                ))
                            }
                        </div>
                        <Arrow
                            direction="prev"
                            onClick={handlePrevMealList}
                        >
                            <FiChevronLeft className="arrow"/>
                        </Arrow>

                        <Arrow
                            direction="next"
                            onClick={handleNextMealList}
                        >
                            <FiChevronRight className="arrow"/>
                        </Arrow>
                    </Section>
                    : ""
                }
                {
                    dessertCategory.length ?
                    <Section ref={paddingDessert} className="section">
                        <h2>Sobremesas</h2>
                        <div ref={scrollDessertList} className="meals" id="dessert">
                            {   
                                favorite &&
                                dessertCategory.map(dessert => (
                                    <MealCard 
                                        key={String(dessert.id)}
                                        data={dessert}
                                        favorite={favorite.includes(dessert.id)}
                                        onClick={() => showMeal(dessert.id)}
                                    />
                                ))
                            }
                        </div>
                        <Arrow
                            direction="prev"
                            onClick={handlePrevDessertList}
                        >
                            <FiChevronLeft className="arrow"/>
                        </Arrow>

                        <Arrow
                            direction="next"
                            onClick={handleNextDessertList}
                        >
                            <FiChevronRight className="arrow"/>
                        </Arrow>
                    </Section>
                    : ""
                }
                
                {
                    drinkCategory.length ?
                    <Section ref={paddingDrink} className="section">
                        <h2>Bebidas</h2>
                        <div ref={scrollDrinkList} className="meals" id="drink">
                            {   
                                favorite&&
                                drinkCategory.map(drink => (
                                    <MealCard 
                                        key={String(drink.id)}
                                        data={drink}
                                        favorite={favorite ? favorite.includes(drink.id) : false}
                                        onClick={() => showMeal(drink.id)}
                                    />
                                ))
                            }
                        </div>
                        <Arrow
                            direction="prev"
                            onClick={handlePrevDrinkList}
                        >
                            <FiChevronLeft className="arrow"/>
                        </Arrow>

                        <Arrow
                            direction="next"
                            onClick={handleNextDrinkList}
                        >
                            <FiChevronRight className="arrow"/>
                        </Arrow>
                    </Section>
                    : ""
                }

            </main>
            <Footer />

        </Container>
    )
}