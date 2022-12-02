import * as React from 'react';
import Popover from '@mui/material/Popover';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import { apiCall } from '../utils/ApiCalls';
import {
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import { TaskCardSearch } from './TaskCardSearch';
import UserCardPopup from './UserCardPopup';
import { Card } from '@mui/material';

let cleanUpTimeout = null

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.35),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
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
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function SearchResultPopover ({ connectedUserIds }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [query, setQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState({});
  const [taskNum, setTaskNum] = React.useState(0);

	const headers = {
		'Accept': 'application/json',
	}

  const search = (event) => {
    clearTimeout(cleanUpTimeout);
    cleanUpTimeout = setTimeout(() => {
      setQuery(event.target.value);
    }, 500)
    handleClick(event);
  }

  const getResults = async () => {
    const data = await apiCall('GET', headers, {}, `search?search=${query}`);
    setSearchResults(data);
    if (data.tasks.length) {
      const temp = data.tasks.filter(task => connectedUserIds.includes(task.assignedTo));
      setTaskNum(temp.length);
    }
  }

  React.useEffect(() => {
    if (query.length !== 0) {
      getResults();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar>
          <Search>
            <SearchIconWrapper>
              <MDBIcon fas icon="search" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={search}
            />
          </Search>
        </Toolbar>
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        disableAutoFocus={true}
        disableEnforceFocus={true}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MDBCard className="mb-4 mb-lg-0">
          <MDBCardBody className="p-0">
            <MDBListGroup flush='true' className="rounded-3">
              <MDBListGroupItem className="d-flex justify-content-center align-items-center p-2">
                <MDBIcon fas icon="user-check" style={{ color: '#55acee' }} />
                <MDBCardText>Users&nbsp;{`(${searchResults.numUsers})`}</MDBCardText>
              </MDBListGroupItem>
              <MDBListGroupItem className="d-flex flex-column mb-3">
                {
                 (!searchResults.api_response && searchResults.users) ?
                  searchResults.users.map(function (user, idx) {
                    return <UserCardPopup user={user} key={idx}/>
                  })
                  :
                  <Card>no user found</Card>
                }
              </MDBListGroupItem>
            </MDBListGroup>
            <MDBListGroup flush='true' className="rounded-3">
              <MDBListGroupItem className="d-flex justify-content-center align-items-center p-2">
                <MDBIcon fas icon="user-check" style={{ color: '#55acee' }} />
                <MDBCardText>Tasks&nbsp;{`(${taskNum})`}</MDBCardText>
              </MDBListGroupItem>
              <MDBListGroupItem className="d-flex flex-column justify-content-around align-items-center p-3">
                {
                  (!searchResults.api_response && searchResults.tasks)
                  &&
                  searchResults.tasks
                    .filter(task => connectedUserIds.includes(task.assignedTo))
                    .map(function (task, idx) {
                      return <TaskCardSearch task={task} key={idx} />
                    })
                }
              </MDBListGroupItem>
            </MDBListGroup>
          </MDBCardBody>
        </MDBCard>
      </Popover>
    </div>
  );
}
