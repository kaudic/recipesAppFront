import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Cards from '../Cards/Cards';
import MenuCtn from '../../containers/MenuCtn';
import Page from '../Page/Page';

const Home = ({
    recipes,
    recipesSearchList,
    handleSetSearchList
}) => {

    // internal state for controlling the input search field
    const [searchString, setSearchString] = useState('');

    // internal state for controlling the checkBox for filtering cards (poisson, viande, vegan)
    const [typeFilter, setTypeFilter] = useState([1, 2, 3]);

    // function to update the state typeFilter
    const updateTypeFilter = (typeId) => {
        const oldTypeFilterState = typeFilter;

        if (oldTypeFilterState.includes(parseInt(typeId))) {
            const indexOfTypeId = oldTypeFilterState.indexOf(parseInt(typeId));
            oldTypeFilterState.splice(indexOfTypeId, 1);
        } else {
            oldTypeFilterState.push(parseInt(typeId));
        }
        const newTypeFilterState = [...oldTypeFilterState];
        setTypeFilter(newTypeFilterState)
    }

    // update the searchList at each change of recipes and searchString
    useEffect(() => {

        // in case there is no search string then we decide to start from all recipes in the search list and then apply the checkBox filter
        if (searchString === '') {
            const filteredRecipesFromCheckbox = recipes.filter((recipe) => {
                return typeFilter.includes(parseInt(recipe.type_id));
            })
            handleSetSearchList(filteredRecipesFromCheckbox);
            return;
        }

        // in case we have a search string then we update the searchList from the store
        const searchRecipes = recipes.filter((recipe) => {

            return (
                (recipe.title.toLowerCase().includes(searchString.toLowerCase()) ||
                    recipe.reference.toLowerCase().includes(searchString.toLowerCase()) ||
                    recipe.text.toLowerCase().includes(searchString.toLowerCase()) ||
                    // look for the searchString in the ingredients
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
                    )) &&
                // Check that type of recipe matches with checked inputBox
                (typeFilter.includes(parseInt(recipe.type_id)))
            )
        })
        handleSetSearchList(searchRecipes);
        return;

    }, [searchString, recipes, typeFilter]);

    // function to filter the recipes by looking for a searchString
    const handleSearchOnChange = (event) => {
        setSearchString(event.target.value);
    };

    return (
        <Page>
            <MenuCtn handleSearchOnChange={handleSearchOnChange} updateTypeFilter={updateTypeFilter} />
            <Cards recipes={recipesSearchList} />
        </Page>
    )
}

Home.propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        reference: PropTypes.string.isRequired,
        img_name: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        meal_qty: PropTypes.number.isRequired,
        cooking_time: PropTypes.shape({
            hours: PropTypes.number,
            minutes: PropTypes.number.isRequired
        }).isRequired,
        preparation_time: PropTypes.shape({
            hours: PropTypes.number,
            minutes: PropTypes.number.isRequired
        }).isRequired,
        type_id: PropTypes.number.isRequired,
        basket: PropTypes.bool.isRequired
    })).isRequired,
    recipesSearchList: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        reference: PropTypes.string.isRequired,
        img_name: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        meal_qty: PropTypes.number.isRequired,
        cooking_time: PropTypes.shape({
            hours: PropTypes.number,
            minutes: PropTypes.number.isRequired
        }).isRequired,
        preparation_time: PropTypes.shape({
            hours: PropTypes.number,
            minutes: PropTypes.number.isRequired
        }).isRequired,
        type_id: PropTypes.number.isRequired,
        basket: PropTypes.bool.isRequired
    })).isRequired,
    handleSetSearchList: PropTypes.func
}

Home.defaultProps = {
    recipes: [],
    recipesSearchList: []
}

export default React.memo(Home);