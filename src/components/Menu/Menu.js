import React from 'react';
import PropTypes from 'prop-types';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import BlenderIcon from '@mui/icons-material/Blender';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink } from 'react-router-dom';
import './menu.scss';
import Badge from '@mui/material/Badge';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { actionSetRandomRecipe } from '../../actions/recipes';
import { useDispatch } from 'react-redux';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const Menu = ({ handleSearchOnChange }) => {

    const dispatch = useDispatch();
    const url = window.location.pathname;
    const recipeCount = useSelector((state) => state?.basket?.list?.recipesCount[0]?.count || 0);
    const handleShuffleClick = () => {
        dispatch(actionSetRandomRecipe());
    }

    return (
        <Box sx={{ flexGrow: 1, height: "150px" }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <NavLink className="menu-link" to='/'>
                            <BlenderIcon fontSize='large' />
                        </NavLink>
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block', overflow: 'visible' } }}>
                        <NavLink className="menu-link" to='/'>
                            Consulter
                        </NavLink>
                        <NavLink className="menu-link" to='/create'>
                            Créer
                        </NavLink>
                        <NavLink className="menu-link" to='/basket'>
                            <Badge badgeContent={recipeCount} color="secondary">
                                Panier
                            </Badge>
                        </NavLink>


                    </Typography>
                    {url === '/' &&
                        <><Search
                            onChange={handleSearchOnChange}>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                            <div>
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Viande" />
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Poisson" />
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Vegan" />

                            </div>

                            <Button variant="contained" color="secondary" className="menu-shuffle" onClick={handleShuffleClick}>
                                Shuffle
                            </Button>
                        </>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

Menu.propTypes = {}

export default React.memo(Menu);