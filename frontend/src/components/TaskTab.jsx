import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TaskLogCard } from './TaskLogCard';
import { apiCall } from '../utils/ApiCalls';
import { TaskCommentCard } from './TaskCommentCard';
import NewTaskCommentPopup from './NewTaskCommentPopup';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
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
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function TaskTab({taskId, assignee}) {
	const [histories, setHistories] = React.useState([]);
	const [comments, setComments] = React.useState([]);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

	const headers = {
		'Accept': 'application/json',
	}

	const getTaskHistories = async () => {
		const data = await apiCall('GET', headers, {}, `task/gethistory?taskId=${taskId}`);
		setHistories(data);
	}

  const getComments = async (taskId) => {
		const data = await apiCall('GET', headers, {}, `taskcomment?taskId=${taskId}`);
    setComments(data);
	}

	React.useEffect(() => {
		getTaskHistories();
    getComments(taskId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', width: 500 }} >
      <AppBar position="static" className='bg-warning'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Comments" {...a11yProps(0)} />
          <Tab label="History" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction} style={{maxHeight: 300, overflow: 'auto'}}>
          <NewTaskCommentPopup taskId={taskId} getComments={getComments}/>
          {
            !comments.api_response
            &&
            comments.map(function (comment, idx) {
              return <TaskCommentCard comment={comment} key={idx} getComments={getComments} assignee={assignee}/>
            })
          }
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction} style={{maxHeight: 300, overflow: 'auto'}}>
          {
            !histories.api_response
            &&
            histories.map(function (history, idx) {
              return <TaskLogCard history={history} key={idx}/>
            })
          }
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}