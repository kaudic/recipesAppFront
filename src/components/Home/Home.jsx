import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Cards from '../Cards/Cards';
import Menu from '../Menu/Menu';
import Page from '../Page/Page';
import { useSelector, useDispatch } from 'react-redux';
import { actionSetSearchList } from '../../actions/recipes';

const Home = () => {
    const dispatch = useDispatch();

    // Get datas from the redux store
    const recipes = useSelector((state) => state.recipes.list);
    const recipesSearchList = useSelector((state) => state.recipes.searchList);

    // internal state for controlling the input search field
    const [searchString, setSearchString] = useState('');

    // update the searchList at each change of recipes and searchString
    useEffect(() => {

        // in case there is no search string then we decide to register all recipes in the search list
        if (searchString === '') {
            dispatch(actionSetSearchList(recipes));
            return;
        }

        // in case we have a search string then we update the searchList from the store
        const searchRecipes = recipes.filter((recipe) => {

            return (
                recipe.title.toLowerCase().includes(searchString.toLowerCase()) ||
                recipe.reference.toLowerCase().includes(searchString.toLowerCase()) ||
                recipe.text.toLowerCase().includes(searchString.toLowerCase()) ||
                (
                    (() => {
                        let isRecipe = false;
                        recipe.ingredients.forEach((ingredient) => {
                            if (ingredient.name) {
                                if (ingredient.name.toLowerCase().includes(searchString.toLowerCase())) {
                                    isRecipe = true;
                                }
                            }
                        });
                        return isRecipe;
                    })()
                ))
        })

        dispatch(actionSetSearchList(searchRecipes));
        return;

    }, [searchString, recipes, dispatch]);

    // function to filter the recipes by looking for a searchString
    const handleSearchOnChange = (event) => {
        setSearchString(event.target.value);
    };

    return (
        <Page>
            <Menu handleSearchOnChange={handleSearchOnChange} />
            <Cards recipes={recipesSearchList} />
        </Page>
    )
}

Home.propTypes = {};

export default React.memo(Home);