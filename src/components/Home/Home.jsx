import React, { useEffect, useState } from 'react';
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
                console.log(typeFilter);
                console.log(recipe.id, typeFilter.includes(parseInt(recipe.id)));
                return typeFilter.includes(parseInt(recipe.type_id));
            })
            dispatch(actionSetSearchList(filteredRecipesFromCheckbox));
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

        dispatch(actionSetSearchList(searchRecipes));
        return;

    }, [searchString, recipes, typeFilter, dispatch]);

    // function to filter the recipes by looking for a searchString
    const handleSearchOnChange = (event) => {
        setSearchString(event.target.value);
    };

    return (
        <Page>
            <Menu handleSearchOnChange={handleSearchOnChange} updateTypeFilter={updateTypeFilter} />
            <Cards recipes={recipesSearchList} />
        </Page>
    )
}

export default React.memo(Home);