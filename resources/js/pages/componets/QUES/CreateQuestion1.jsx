import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function CreateQuestion1(props) {

    const { formData, inputChange, categoriesArray } = props;

    return (
        <Grid container>
            <Grid sm={2} />
            <Grid lg={8} sm={8} spacing={10}>
                <InputLabel id="demo-simple-select-label">カテゴリ</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="カテゴリー"
                    onChange={inputChange}
                    name="category_id"
                    defaultValue={formData.category_id}
                >
                  {categoriesArray.map((categoryArray,index) => (
                    <MenuItem value={categoryArray.id} key={index}>{categoryArray.category}</MenuItem>
                  ))}
                </Select>
            </Grid>
        </Grid>
    )
}

export default CreateQuestion1