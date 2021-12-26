import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BasicDetail from './BasicDetail';
import UserAchievement from './UserAchievement';
import UserSkill from './UserSkill';
import BasicDetailsEdit from './BasicDetailsEdit';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
 
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 4 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Mypage() {
  const [value, setValue] = React.useState(0);
  const [user, setUser] = useState([]);
  const id = 1;

    //一覧情報を取得しステートquestionsにセットする
    const getUserData = (id) => {
      axios
      .get('/api/users/' + id)
          .then(response => {
              setUser(response.data);
              console.log(response.data);
          })
          .catch(() => {
              console.log('通信に失敗しました');
          });
    }

    useEffect(() => {
      getUserData(id);
  },[])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="基本情報" {...a11yProps(0)} />
          <Tab label="実績" {...a11yProps(1)} />
          <Tab label="アンケート結果確認" {...a11yProps(2)} />
          <Tab label="test" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <BasicDetail />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UserAchievement /> 
      </TabPanel>
      <TabPanel value={value} index={2}>
        <UserSkill />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <BasicDetailsEdit user={user}/>
      </TabPanel>
    </Box>
  );
}