import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Page from '../Page/Page';
import './recipeForm.scss';
import { useDispatch } from 'react-redux';
import RecipeFormModifyBtns from '../RecipeFormModifyBtns/RecipeFormModifyBtns';
import RecipeFormCreationBtns from '../RecipeFormCreationBtns/RecipeFormCreationBtns';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TitleIcon from '@mui/icons-material/Title';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import UploadIcon from '@mui/icons-material/Upload';
import Button from '@mui/material/Button';
import useControlledInput from '../../hooks/useControlledInput';
import { actionFetchModifyRecipe, actionFetchPutImage, actionFetchCreateRecipe } from '../../actions/recipes';
import convertObjectToFormData from '../../Tools/convertObjectToFormData';
import IngredientDialogBox from '../IngredientDialogBox/IngredientDialogBox';
import buildAutocompleteOptions from '../../Tools/buildAutocompleteOptions';
import parseMinutesInInterval from '../../Tools/parseMinutesInInterval';
import Swal from 'sweetalert2';
import IngredientList from '../IngredientList/IngredientList';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SetMealIcon from '@mui/icons-material/SetMeal';

const RecipeForm = ({ recipe, units, types, ingredientsList, setModify, handleCancelClick, handleModifyClick, creationMode }) => {

    // factorisation of Box Style
    const boxStyle = {
        display: 'flex', alignItems: 'flex-end', marginTop: '20px', width: '60%'
    };

    // States for the form - use of a custom hook to handle inputs
    const [spreadInputTitle, title, setTitle] = useControlledInput(recipe.title);
    const [spreadInputReference, reference, setReference] = useControlledInput(recipe.reference);
    const [spreadInputMealQty, mealQty, setMealQty] = useControlledInput(recipe.meal_qty);
    const [spreadInputPreparationTime, preparationTime, setPreparationTime] = useControlledInput(recipe.preparation_time.minutes);
    const [spreadInputCookingTime, cookingTime, setCookingTime] = useControlledInput(recipe.cooking_time.minutes);
    const [spreadInputText, text, setText] = useControlledInput(recipe.text);
    const [typeId, setTypeId] = useState(recipe.type_id);

    // state for image
    const [imgData, setImgData] = useState('');
    const [imageToLoad, setImageToLoad] = useState(false);

    // Handle put, delete and create of ingredients
    const [ingredients, setIngredients] = useState(recipe.ingredients);

    // States for dialog box
    const [ingregientDialBoxOpen, setIngregientDialBoxOpen] = useState(false);
    const [ingredientValue, setIngredientValue] = useState(null);

    const [qtyValue, setQtyValue] = useState(null);
    const [unitValue, setUnitValue] = useState(null);

    // function to handle the change of recipe type
    const handleSelectTypeChange = (event) => {
        setTypeId(event.target.value);
    }

    // function for dialog box to handle change of unit 
    const handleChangeOfUnit = (event, value) => {
        setUnitValue(value);
    };
    // function for dialog box to get the default unit id from chosen ingredient and pass it to the unit autocomplete
    const handleChangeOfIngredient = (event, value) => {
        const findUnitIndex = units.findIndex((unit) => parseInt(unit.id) === parseInt(value.unitId));
        const unitValue = buildAutocompleteOptions([units[findUnitIndex]])[0];
        setUnitValue(unitValue);
        setIngredientValue(value);

        // check if ingredient is already in the recipe ingredients, if yes, then refuse the selection
        ingredients.forEach((ingredient) => {
            if (ingredient.id === value.id) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Cet ingrédient est déjà dans la recette',
                    showConfirmButton: false,
                    timer: 1500
                })
                // alert('Cet ingrédient est déjà dans la recette');
                cancelDialogBoxState();
            }
        })
    }
    // function for dialog box to register in a state the qty of ingredient after each change of qty
    const handleChangeOfQty = (event) => {
        setQtyValue(event.target.value);
    }
    // get dispatch function from Redux
    const dispatch = useDispatch();
    // function to make an API call to modify the current recipe
    const handleSubmitClick = (event) => {
        event.preventDefault();

        // checking ingredients
        if (ingredients.length === 0) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Il doit obligatoirement y avoir au minimum 1 ingrédient',
            })
        }

        // building an object respecting API schema
        const modifiedRecipe = {
            id: recipe.id,
            recipe: {
                title,
                reference,
                // imgName: imgName is sent on different action with the submit of a new picture file
                text,
                mealQty,
                cookingTime: parseMinutesInInterval(cookingTime),
                preparationTime: parseMinutesInInterval(preparationTime),
                typeId,
                ingredients
            }
        }
        dispatch(actionFetchModifyRecipe(modifiedRecipe));

        // check if an image is enclosed and therefore send a 2nd query
        if (imgData) {
            dispatch(actionFetchPutImage(imgData))
        }
        setModify(false);
    }
    // function to make an API call to create a new recipe
    const handleCreationClick = (event) => {
        event.preventDefault();

        // checking ingredients
        if (ingredients.length === 0) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Il doit obligatoirement y avoir au minimum 1 ingrédient',
            })
        }

        // building an object respecting API schema
        const newRecipe = {
            title,
            reference,
            // imgName: imgName is sent on a PUT request with a formData
            text,
            mealQty,
            cookingTime: parseMinutesInInterval(cookingTime),
            preparationTime: parseMinutesInInterval(preparationTime),
            typeId,
            ingredients
        }
        dispatch(actionFetchCreateRecipe(newRecipe, imgData));

    }
    // function to handle the image attachment
    const handleChangeInputFile = (event) => {
        const imgFile = event.target.files[0];

        // Build the multipartFormData for the API and store it in the state
        const imgData = {
            recipeId: recipe.id,
            imgName: imgFile.name,
            imgFile
        };
        setImgData(imgData);
    }
    // function to submit an image file to the API
    const handleUploadImg = (event) => {

        // making the API call through redux middleware
        dispatch(actionFetchPutImage(convertObjectToFormData(imgData)));

        // emptying the state to hide button
        setImgData('');

    };
    // function to handle the change on an ingredient qty
    const updateIngredientsQtyChange = (ingredientId, newQty) => {
        ingredients.forEach((ingredient) => {
            if (parseInt(ingredient.id) === parseInt(ingredientId)) {
                ingredient.qty = newQty;
            }
        });
        setIngredients(ingredients);
    };
    // function to handle the change on an ingredient unitId
    const updateIngredientsUnitChange = (ingredientId, unitId) => {
        ingredients.forEach((ingredient) => {
            if (parseInt(ingredient.id) === parseInt(ingredientId)) {
                ingredient.unitId = unitId;
            }
        });
        setIngredients(ingredients);
    };
    // function to delete an ingredient
    const deleteIngredient = (ingredientId) => {
        // console.log('ingredientId: ' + ingredientId);
        const oldIngredients = [...ingredients];
        // console.log('oldIngredients: ' + JSON.stringify(oldIngredients));
        const ingredientIndex = oldIngredients.findIndex((ingredient) => parseInt(ingredient.id) === parseInt(ingredientId));
        const deletedIngredients = oldIngredients.splice(ingredientIndex, 1);
        // console.log('deletedIngredients: ' + JSON.stringify(deletedIngredients));
        const newIngredients = [...oldIngredients];
        // console.log('modifying the state of ingredients in RecipeForm');
        // console.log('newIngredients: ' + JSON.stringify(newIngredients));
        setIngredients(newIngredients);
    }
    // function to display a dialogBox to add Ingredient to the Recipe
    const handleIngredientDialBoxClickOpen = () => {
        setIngregientDialBoxOpen(true);
    };
    // function to initialize the states of the dialogbox after it closes
    const cancelDialogBoxState = () => {
        setIngredientValue(null);
        setQtyValue(null);
        setUnitValue(null);
    };
    // function to hide a dialogBox to add Ingredient to the Recipe
    const handleIngredientDialBoxClickClose = () => {
        setIngregientDialBoxOpen(false);
        // cancel all the states so that next time dialogbox shows up, it is empty
        cancelDialogBoxState();
    };
    // function to hide a dialogBox to add Ingredient to the Recipe AND adding an ingredient
    const handleIngredientDialBoxClickValidate = () => {
        setIngregientDialBoxOpen(false);
        const newIngredient = {
            id: ingredientValue.id,
            name: ingredientValue.label,
            qty: qtyValue,
            unitId: unitValue.id
        };

        if (ingredientValue.id && qtyValue && unitValue.id) {
            ingredients.push(newIngredient);
            setIngredients(ingredients);
        }
        // cancel all the states so that next time dialogbox shows up, it is empty
        cancelDialogBoxState();
    };

    return (
        <Page>
            {creationMode ?
                <RecipeFormCreationBtns handleCreationClick={handleCreationClick} /> :
                <RecipeFormModifyBtns handleCancelClick={handleCancelClick} handleModifyClick={handleModifyClick} handleSubmitClick={handleSubmitClick} />
            }

            <form className="recipeForm">
                <div className="recipeForm-div">
                    <h1 className="recipeForm-title">Informations Générales</h1>
                    <Box sx={boxStyle}>
                        <TitleIcon color="primary" sx={{ mr: 1, my: 0.5 }} />
                        <TextField id="" name="title" label="Titre de la recette" variant="standard" fullWidth {...spreadInputTitle} />
                    </Box>
                    <Box sx={boxStyle}>
                        <MenuBookIcon color="warning" sx={{ mr: 1, my: 0.5 }} />
                        <TextField id="" name="reference" label="Référence de la recette" variant="standard" fullWidth {...spreadInputReference} />
                    </Box>
                    <Box sx={boxStyle}>
                        <RestaurantIcon color="info" sx={{ mr: 1, my: 0.5 }} />
                        <TextField id="" name="mealQty" label="Nombre de repas" variant="standard" fullWidth  {...spreadInputMealQty} />
                    </Box>
                    <Box sx={boxStyle}>
                        <AccessTimeIcon color="secondary" sx={{ mr: 1, my: 0.5 }} />
                        <TextField id="" name="preparationTime" label="Temps préparation (min)" variant="standard" fullWidth {...spreadInputPreparationTime} />
                    </Box>
                    <Box sx={boxStyle}>
                        <MicrowaveIcon color="success" sx={{ mr: 1, my: 0.5 }} />
                        <TextField id="" name="cookingTime" label="Temps cuisson (min)" variant="standard" fullWidth {...spreadInputCookingTime} />
                    </Box>
                    <Box sx={boxStyle}>
                        <SetMealIcon color="success" sx={{ mr: 1, my: 0.5 }} />
                        <Select
                            sx={{ marginTop: '10px', width: '100%' }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={typeId}
                            onChange={handleSelectTypeChange}
                        >{types.map((type) => <MenuItem key={type.id} value={parseInt(type.id)}>{type.name}</MenuItem>)}
                        </Select>
                    </Box>


                    <div className="recipeForm-upload">
                        <Button sx={{ marginTop: '2rem' }} variant="contained" component="label" endIcon={<UploadIcon />}>
                            Image
                            <input type="file" onChange={handleChangeInputFile} hidden />
                        </Button>

                        {imgData !== '' &&
                            <div className="recipeForm-upload-image">{imgData.imgName}</div>
                        }

                    </div>
                </div>
                <div className="recipeForm-div">
                    <h1 className="recipeForm-title">Recette</h1>
                    <TextField sx={{ marginTop: '2rem' }}
                        id=""
                        name="recette"
                        label="Description de la recette"
                        multiline
                        rows={25}
                        fullWidth
                        color="secondary"
                        {...spreadInputText}
                    />
                </div>
                <div className="recipeForm-div">
                    <IngredientList
                        handleIngredientDialBoxClickOpen={handleIngredientDialBoxClickOpen}
                        ingredients={ingredients}
                        units={units}
                        updateIngredientsQtyChange={updateIngredientsQtyChange}
                        updateIngredientsUnitChange={updateIngredientsUnitChange}
                        deleteIngredient={deleteIngredient}
                        ingredientListClassName={"ingredientForm"} />
                </div>
            </form>
            <IngredientDialogBox
                handleIngredientDialBoxClickClose={handleIngredientDialBoxClickClose}
                handleIngredientDialBoxClickValidate={handleIngredientDialBoxClickValidate}
                ingregientDialBoxOpen={ingregientDialBoxOpen}
                units={units}
                ingredientsList={ingredientsList}
                handleChangeOfIngredient={handleChangeOfIngredient}
                handleChangeOfUnit={handleChangeOfUnit}
                unitValue={unitValue}
                handleChangeOfQty={handleChangeOfQty}
            />

        </Page>
    )
}

RecipeForm.propTypes = {};

RecipeForm.defaultProps = {
    recipe: {
        title: '',
        reference: '',
        meal_qty: '',
        text: '',
        preparation_time: {
            minutes: ''
        },
        cooking_time: {
            minutes: ''
        },
        ingredients: []
    },
    creationMode: false,
    units: [{ id: 0, name: 'toto' }]
}

export default React.memo(RecipeForm);