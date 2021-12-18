import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function CreateQuestion1(props) {

    const { formData } = props;
    const [localCategory, setLocalCategory] = useState(localStorage.getItem("localCategory"));
    const [categoriesArray, setCategoriesArray] = useState([]);

    
    useEffect(() => {
      getCategoryData();
    },[]);
    
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

    const handleChange = (event) => {
      setLocalCategory(event.target.value);
      localStorage.setItem('localCategory', event.target.value);
      formData.category = event.target.value;
    };




    return (
        <Grid container>
            <Grid sm={2} />
            <Grid lg={8} sm={8} spacing={10}>
                <InputLabel id="demo-simple-select-label">カテゴリ</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="カテゴリー"
                    defaultValue={localStorage.getItem("localCategory")}
                    onChange={handleChange}
                    name="category"
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