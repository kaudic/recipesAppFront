import React from 'react';
import PropTypes from 'prop-types';
import './unitDialogBox.scss';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const UnitDialogBox = ({
    title,
    subtitle,
    unitDialBoxOpen,
    handleUnitDialBoxClickClose,
    handleUnitDialBoxClickValidate,
    handleChangeUnitName,
    handleChangeUnitShortName
}) => {
    return (
        <Dialog className="dialogBox" open={unitDialBoxOpen} onClose={handleUnitDialBoxClickClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {subtitle}
                </DialogContentText>

                <TextField
                    margin="dense"
                    id="name"
                    label="Rentrer un nom d'unité"
                    type="value"
                    fullWidth
                    variant="standard"
                    onChange={handleChangeUnitName}
                />
                <TextField
                    margin="dense"
                    id="name"
                    label="Rentrer les initiales de l'unité"
                    type="value"
                    fullWidth
                    variant="standard"
                    onChange={handleChangeUnitShortName}
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={handleUnitDialBoxClickClose}>Annuler</Button>
                <Button onClick={handleUnitDialBoxClickValidate}>Ajouter</Button>
            </DialogActions>
        </Dialog>
    )
}

UnitDialogBox.propTypes = {};

export default React.memo(UnitDialogBox);