import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function CreateQuestion1(props) {
    const [selectedCategory, setSelectedCategory] = useState(localStorage.getItem("selectedCategory"));
    const [categoriesArray, setCategoriesArray] = useState([]);

    
    useEffect(() => {
      getCategoryData();
    },[]);
    
    const handleChange = (event) => {
      setSelectedCategory(event.target.value);
      localStorage.setItem('selectedCategory', event.target.value);
    };

    //DBからカテゴリ一覧を取得
    const getCategoryData = () => {
      axios
          .get('/api/categories')
          .then(response => {
              setCategoriesArray(response.data);
              console.log(response.data);
          })
          .catch((error) => {
              console.log('通信エラー: '+ error);
          });
    }



    return (
        <Grid container>
            <Grid sm={2} />
            <Grid lg={8} sm={8} spacing={10}>
                <InputLabel id="demo-simple-select-label">カテゴリ</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="カテゴリー"
                    defaultValue={localStorage.getItem("selectedCategory")}
                    onChange={handleChange}
                >
                  {categoriesArray.map((categoryArray, index) => (
                    <MenuItem value={categoryArray.category} key={index}>{categoryArray.category}</MenuItem>
                  ))}
                </Select>
            </Grid>
        </Grid>
    )
}

export default CreateQuestion1