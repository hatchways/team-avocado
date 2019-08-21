import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { Route, Switch } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import PickTagDialog from './PickTagDialog'
import { callAPI } from "../helpers/api";
import { useEffect, useContext } from "react";
import AuthContext from "../store/createContext";
import { Link} from "react-router-dom";
import SendRequestDialog from "./SendRequestDialog";

const Container = styled.div`


    height:100%;
    display : flex;
	flex-direction: column;
    justify-content:space-between;
    font-family: "Montserrat";
    #cover{
        max-width:100%;
    }

    #profile{
        display:block;
        margin-left:auto;
        margin-right:auto;
    }






`;

const RequestButton = styled(Button)`
  width:100%;
`;
const useStyles = makeStyles({
    form:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        height:"100%",
        justifyContent:"space-between",
    },
    input:{
        display:'none',

    },
    cover:{
        cursor:"pointer",
        maxWidth:"100%"
    },
    profile:{
        position:"absolute",
        top:"15%",
        left:"30%",
        cursor:"pointer",
    },

    textField:{
        fontFamily: "Montserrat",
    },
    wrap:{
        height:"100%",
    },
    profileimg:{
        position:"absolute",
        top:"15%",
        left:"30%",
        
    },
    info:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
    },
    name:{
        textAlign:"center",
        fontWeight: "bold",
        fontSize: 20,
    },
    location:{
        textAlign:"center",
        color:"grey",
    },
    desc:{
        textAlign:"center",
    }

});
const cuisines = ["Chinese","Indian","American","Japanese"];

//TODO: pass in props and get data from props
 export default function Namecard({ user_id }) {

    const classes = useStyles();

    const [values, setValues] = React.useState({
        name: "",
        strlocation: '',
        description:'', 
        avatar:"",
        background:"",
    }); 

    const {user,setUser} = useContext(AuthContext);
    const endpoint = `chef/${user_id}`;
    
    useEffect(() => {
        async function getChef(){
        const chef= await callAPI({
            endpoint: endpoint,
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
            });
            setValues({name:chef.name, strlocation:chef.strlocation, description:chef.description, avatar:chef.avatar, background:chef.background});
        }
        getChef();
    }
        ,[]);


    

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };
    async function onSubmitAttempt(e) {
        e.preventDefault();
        try {
          const chef = await callAPI({
            endpoint: `chef/${user_id}`,
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: values,
            token: user.token,
          });
          
          setUser(chef);
        } catch (error) {
          console.log(error);
        }
      }
      async function handleClick(event){
        
        const fileObj = event.target.files[0];
        console.log("FileObj",fileObj);
        let formData = new FormData();
        console.log("target.id",event.target.id);

        formData.append("image", fileObj);
        const id = event.target.id;
        if(id === "profile-img-file" ){
            var imgAlt = "avatar";
        }else if(id === "background-img-file" ){
            var imgAlt = "chef_background";
        }
        try {
            console.log("What's wrong",imgAlt);
          const endpoint = `chef/${user_id}/${imgAlt}`
          const imgURL = await callAPI({
                endpoint: endpoint,
                method:"POST",
                body: formData,
                isForm: true,
            });
            console.log("url returned",imgURL);
            console.log("NMSL",imgAlt === "chef_background");
            if (imgAlt === "chef_background"){
                setValues({...values, background:imgURL});
            }else if (imgAlt === "avatar"){
                setValues({...values, avatar:imgURL});
            }
        } catch (error) {
          console.log(error);
        }
      };


      
    return (
    

    <div className={classes.wrap}>
        <Switch>
    
            <Route path="/chef/:chef_id/edit">
            <form encType="multipart/form-data">
            <input
                    accept="image/*"
                    className={classes.input}
                    id="profile-img-file"
                    type="file"
                    onChange={handleClick}
                />
                </form>
                <label htmlFor="profile-img-file">
                    <Tooltip title="Click to upload new profile" placement="top-start">

                        <img className ={classes.profile} alt="profile" src={values.avatar} />
                    </Tooltip>
                </label>
            </Route>
            <Route path="/chef/:chef_id">
                <img className={classes.profileimg} alt="profile" src={values.avatar}/>
            </Route>
        </Switch>
    <Container>
        <Switch>
          {/* change to if else, if user is logged in and  */}
          {/* this is user's profile page, show edit button */}
          
            <Route path="/chef/:chef_id/edit">  
            <form className={classes.form} onSubmit={onSubmitAttempt} >
                
                <input
                    accept="image/*"
                    className={classes.input}
                    id="background-img-file"
                    multiple
                    type="file"
                    onChange={handleClick}
                />
                <label htmlFor="background-img-file">
                    <Tooltip title="Click to upload new background" placement="top-start">

                        <img className={classes.cover} alt="background" src={values.background} />
                    </Tooltip>
                </label>

                {/* <form className={classes.form}> */}
                <div className={classes.info}>
                <PickTagDialog cuisines={cuisines} />
                <TextField
                    id="outlined-name"
                    label="Name"
                    className="{classes.textField}"
                    value={values.name}
                    onChange={handleChange('name')}
                    margin="dense"
                    variant="outlined"
                />
                <TextField
                    id="outlined-location"
                    label="Location"
                    className="{classes.textField}"
                    value={values.strlocation}
                    onChange={handleChange('strlocation')}
                    margin="dense"
                    variant="outlined"
                />
                <TextField
                    id="outlined-desc"
                    label="Description"
                    className="{classes.textField}"
                    multiline
                    rowsMax="4"
                    value={values.description}
                    onChange={handleChange('description')}
                    margin="dense"
                    variant="outlined"
                />
                <TextField
                    id="outlined-oldpassword"
                    label="Old Password"
                    className="{classes.textField}"
                    value={values.oldpassword}
                    onChange={handleChange('oldpassword')}
                    margin="dense"
                    variant="outlined"
                />

                <TextField
                    id="outlined-newpassword"
                    label="New Password"
                    className="{classes.textField}"
                    value={values.newpassword}
                    onChange={handleChange('newpassword')}
                    margin="dense"
                    variant="outlined"
                />
                </div>
                <Link
                to={endpoint}
                style={{
                    color: "black",
                    fontSize: "0.25rem"
                }}
                >
                Simulate
                </Link>
                <RequestButton type="submit" >
                    Save Profile
                </RequestButton>
                </form>

            </Route>
            <Route path="/chef/:chef_id">
                <img id="cover" alt="background" src={values.background} />
                <div>
                    <p className={classes.name}>{values.name}</p>
                    <p className={classes.location}> {values.strlocation}</p>
                </div>
                <div>
                    <p className={classes.desc}>{values.description}</p>
                </div>
                {/* <RequestButton type="submit" >
                    Send Request
                </RequestButton>
                <div> */}
                <SendRequestDialog/>

            </Route>
 
         
        </Switch>
    </Container>
    </div>
  );



}
