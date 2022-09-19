import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './formsTabs.scss';

const FormsTabs = ({ handleTabsChange, tabsValue }) => {

    return (
        <div className="FormsMenu">
            <Tabs
                selectionFollowsFocus={true}
                orientation="vertical"
                value={tabsValue}
                onChange={handleTabsChange}
                variant="scrollable"
                scrollButtons={false}
                aria-label="scrollable prevent tabs example"
                textColor='primary'
                indicatorColor=''
            >
                <Tab onClick={() => console.log('coucou')} label="Recette" />
                <Tab label="Ingrédient" />
                <Tab label="Unité" />
            </Tabs>
        </div>

    )
}

FormsTabs.propTypes = {}

export default React.memo(FormsTabs);