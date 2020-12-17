import React, {useState} from 'react'
import fire from "../firebase"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import "../../styles/UserInfo.scss";
import { Link } from "react-router-dom";

const UserProfile = ({ handleLogout, userid, userEmail }) => {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [mobile, setMobile] = useState('');
    const [location, setLocation] = useState('');
    const [value, setValue] = useState('female');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState(null);

    const resetInputs = () => {
        setName('');
        setSurname('');
        setMobile('');
        setLocation('');
        setValue('female');
        setBio('');
        setImage(null);
    }

    const handleChange = (event) => {
      setValue(event.target.value);
    };

    const handleImageChange = (event) => {
        if(event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const uploadTask = fire.storage().ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {
                console.log(error);
            },
            () => {
                fire.storage()
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        fire.firestore().collection('users').doc(userid).set({
                            name: name,
                            surname: surname,
                            mobile: mobile,
                            location: location,
                            gender: value,
                            bio: bio,
                            user_id: userid,
                            email: userEmail,
                            img: url,
                            img_name: image.name
                        })
                        .then(() => {
                            alert("User Info Submited!")
                            resetInputs();
                            window.location.reload(false);
                        })
                        .catch((error) => {
                            alert(error.message)
                        })
                    })
            }
        )
    };

    return (
        <div>
            <div className="user-profile">
                <div className="user-info-container">
                    <div className="user-welcome-container">
                        <div className="user-welcome">
                            <h1>Welcome to your profile page</h1>
                            <h2>To start with please fill out information about yourself</h2>
                            <h3>Or you can <Link style={{ textDecoration: 'none' }} to="/"><Button onClick={handleLogout} variant="contained" size="small" color="primary">Logout</Button></Link></h3>
                        </div>
                    </div>
                    <div className="user-form-container">
                        <form className="user-form" onSubmit={handleSubmit}>
                            <div className="col-container">
                                    <TextField label="Name" type="text" required value={name} onChange={(e) => setName(e.target.value)}/>
                                    <TextField label="Surname" type="text" required value={surname} onChange={(e) => setSurname(e.target.value)}/>
                                    <TextField label="Mobile phone" type="mobile" required value={mobile} onChange={(e) => setMobile(e.target.value)}/>
                                    <TextField label="Location" type="text" required value={location} onChange={(e) => setLocation(e.target.value)}/>
                                    <TextField variant="outlined" placeholder="Your Bio" multiline rows={5} rowsMax={10} required value={bio} onChange={(e) => setBio(e.target.value)}/>
                            </div>
                            <div className="col-container">
                                <FormControl component="fieldset" className="fieldset-gender">
                                <FormLabel component="legend">Gender</FormLabel>
                                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                        <FormControlLabel value="female" control={<Radio color="primary"/>} label="Female" />
                                        <FormControlLabel value="male" control={<Radio color="primary"/>} label="Male" />
                                        <FormControlLabel value="other" control={<Radio color="primary"/>} label="Other" />
                                    </RadioGroup>
                                </FormControl>
                                <input
                                    className="photo-input"
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    onChange={handleImageChange}
                                />
                                <label htmlFor="contained-button-file">
                                {image ? (
                                <span>{image.name}</span>
                                ) : (
                                    <span>Upload profile picture</span>
                                )}
                                    <Button className="upload-image" variant="contained" color="primary" component="span">
                                        Upload Photo
                                    </Button>
                                </label>
                                <Button type="submit" variant="contained" color="primary">Submit</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
