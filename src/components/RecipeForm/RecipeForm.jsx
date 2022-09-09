import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Page from '../Page';
import Menu from '../Menu/Menu';
import './recipeForm.scss';
import { useDispatch } from 'react-redux';
import IngredientForm from '../IngredientForm/IngredientForm';
import RecipeFormBtns from '../RecipeFormBtns/RecipeFormBtns';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TitleIcon from '@mui/icons-material/Title';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import UploadIcon from '@mui/icons-material/Upload';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tooltip from '@mui/material/Tooltip';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import useControlledInput from '../../hooks/useControlledInput';
import { actionFetchModifyRecipe, actionFetchPutImage } from '../../actions/recipes';
import convertObjectToFormData from '../../Tools/convertObjectToFormData';

const Recipe = ({ recipe, setModify, handleCancelClick }) => {

    // factorisation of Box Style
    const boxStyle = {
        display: 'flex', alignItems: 'flex-end', marginTop: '20px', width: '60%'
    };

    // use of a custom hook to handle inputs
    const [spreadInputTitle, title, setTitle] = useControlledInput(recipe.title);
    const [spreadInputReference, reference, setReference] = useControlledInput(recipe.reference);
    const [spreadInputMealQty, mealQty, setMealQty] = useControlledInput(recipe.meal_qty);
    const [spreadInputPreparationTime, preparationTime, setPreparationTime] = useControlledInput(recipe.preparation_time.minutes);
    const [spreadInputCookingTime, cookingTime, setCookingTime] = useControlledInput(recipe.cooking_time.minutes);
    const [spreadInputText, text, setText] = useControlledInput(recipe.text);
    const [imgData, setImgData] = useState('');
    const [imageToLoad, setImageToLoad] = useState(false);
    const [ingredients, setIngredients] = useState(recipe.ingredients);

    // get dispatch function from Redux
    const dispatch = useDispatch();

    // function to make an API call to modify the current recipe
    const handleSubmitClick = (event) => {
        event.preventDefault();

        // building an object respecting API schema
        const modifiedRecipe = {
            id: recipe.id,
            recipe: {
                title,
                reference,
                // imgName: imgName is sent on different action with the submit of a new picture file
                text,
                mealQty,
                cookingTime: `00:${cookingTime}:00`,
                preparationTime: `00:${preparationTime}:00`,
                typeId: recipe.type_id,
                ingredients
            }
        }
        dispatch(actionFetchModifyRecipe(modifiedRecipe));
        setModify(false);
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

    return (
        <Page>
            <Menu />
            <RecipeFormBtns handleCancelClick={handleCancelClick} handleSubmitClick={handleSubmitClick} />
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
                        <TextField id="" name="preparationTime" label="Temps préparation" variant="standard" fullWidth {...spreadInputPreparationTime} />
                    </Box>
                    <Box sx={boxStyle}>
                        <MicrowaveIcon color="success" sx={{ mr: 1, my: 0.5 }} />
                        <TextField id="" name="cookingTime" label="Temps cuisson" variant="standard" fullWidth {...spreadInputCookingTime} />
                    </Box>
                    <div className="recipeForm-upload">
                        <Button sx={{ marginTop: '2rem' }} variant="contained" component="label" endIcon={<UploadIcon />}>
                            Image
                            <input type="file" onChange={handleChangeInputFile} hidden />
                        </Button>

                        {imgData !== '' &&
                            <div >
                                <div className="recipeForm-upload-image">{imgData.imgName}</div>
                                <Button onClick={handleUploadImg} sx={{ backgroundColor: 'green', marginLeft: '10px', marginTop: '2rem' }} variant="contained" endIcon={<SendIcon />}>
                                    Envoyer
                                </Button>
                            </div>
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
                    <h1 className="recipeForm-title">Liste des ingrédients
                        <Tooltip title="Ajouter Ingrédient">
                            <IconButton>
                                <AddCircleIcon color="success" />
                            </IconButton>
                        </Tooltip>
                    </h1>
                    <ul className="ingredientForm">
                        {recipe.ingredients.map((ingredient) => <IngredientForm key={ingredient.id} ingredient={ingredient} />)}
                    </ul>
                </div>
            </form>
        </Page>
    )
}

Recipe.propTypes = {}

export default React.memo(Recipe);