import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CreateQuestion1 from "./CreateQuestion1";
import CreateQuestion2 from "./CreateQuestion2";
import CreateQuestion3 from "./CreateQuestion3";
//import { KEYS, setItem, getItem, removeItem } from "./LocalStorage";
import { Link  as LinkRouter } from 'react-router-dom';


function Content() {
  const steps = [
    'タイトル',
    '詳細',
    '確認項目'
  ];
  const [activeStep, setActiveStep] = useState(0);
  //フォームの入力値を管理する
  const [formData, setFormData] = useState({category:'', title:'', content:''});
  
  
  //入力がされたら（都度）入力値を変更するためのfunction
  const inputChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    formData[key] = value;
    let data = Object.assign({}, formData);
    setFormData(data);
    console.log(formData);
  }
  
  const createQuestion = async() => {
    //入力値を投げる
    await axios
        .post('/api/questions', {
            name: formData.name,
            email: formData.email,
            password: '12345678',
  
        })
        .then((res) => {
            const tempUsers = users
            console.log(res.data);
            tempUsers.push(res.data);
            setUsers(tempUsers)
            setFormData('');
          })
        .catch(error => {
          console.log(error);
        });
      }
      const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        
      };
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
      const handleReset = () => {
        setActiveStep(0);
      };
      
      function getStepContent(stepIndex) {
          switch (stepIndex) {
              case 0:
                  return <CreateQuestion1 formData={formData} inputChange={inputChange}/>;
              case 1:
                  return <CreateQuestion2 formData={formData} inputChange={inputChange}/>;
              case 2:
                  return <CreateQuestion3 formData={formData} inputChange={inputChange}/>;
              default:
                  return 'Unknown stepIndex';
          }
      }

    return (
        <Grid container>
            <Grid sm={2}/>
            <Grid lg={8} sm={8} spacing={10}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Typography >{getStepContent(activeStep)}</Typography>

                <Button disabled={activeStep === 0} onClick={handleBack}>
                    戻る
                </Button>
                <Button variant="contained" color="primary" onClick={handleNext} >
                    {activeStep === steps.length - 1 ? '送信' : '次へ'}
                </Button>
            </Grid>
        </Grid>
    )
}

export default Content