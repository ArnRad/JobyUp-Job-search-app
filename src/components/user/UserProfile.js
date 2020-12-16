import React, {useState, useEffect} from 'react'
import Modal from 'react-modal'
import fire from "../firebase"
import "../../styles/UserProfile.scss";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const UserProfile = ({ handleLogout, userid }) => {
    const [userData, setData] = useState([]);
    const [editState, setEdit] = useState(false);

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [mobile, setMobile] = useState('');
    const [location, setLocation] = useState('');
    const [value, setGender] = useState('female');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        fire.firestore().collection("users")
        .where("user_id", "==", userid)
        .get()
        .then(querySnapshot => {
            querySnapshot.docs.map(doc => {setData(doc.data()); console.log();});
          });
    }, []);

    const handleChange = (event) => {
        setGender(event.target.value);
      };
  
      const handleImageChange = (event) => {
          if(event.target.files[0]) {
              setImage(event.target.files[0]);
          }
      };

      const handleEdit = (event) => {
        setEdit(true);
        setName(userData.name);
        setSurname(userData.surname);
        setMobile(userData.mobile);
        setLocation(userData.location);
        setGender(userData.gender);
        setBio(userData.bio);
        setImage(userData.image);
      };
  
      const handleSubmit = (event) => {
          event.preventDefault();
          const uploadTask = fire.storage().ref(`images/${userData.img_name}`).put(image);
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
                          fire.firestore().collection('users').add({
                              name: name,
                              surname: surname,
                              mobile: mobile,
                              location: location,
                              gender: value,
                              bio: bio,
                              user_id: userid,
                              email: userData.email,
                              img: url
                          })
                          .then(() => {
                              alert("User Info Submited!")
                            //   resetInputs();
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
                {/* <h2>{userid}</h2> */}
                <div className="user_info_container">
                    <div className="user_info_row">
                        <img className="img_placeholder" src={userData.img} alt="Logo"/>
                        <div className="user_info_column">
                            <span>Name</span>
                            <h2>{userData.name}</h2>
                            <span>Surname</span>
                            <h2>{userData.surname}</h2>
                        </div>
                        <div className="user_info_column">
                            <span>Tel. number</span>
                            <h2>{userData.mobile}</h2>
                            <span>Email</span>
                            <h2>{userData.email}</h2>
                        </div>
                        <div className="user_info_column">
                            <span>Gender</span>
                            <h2>{userData.gender}</h2>
                            <span>Location</span>
                            <h2>{userData.location}</h2>
                        </div>
                    </div>
                    <div className="user_info_row2">
                        <span>BIO</span>
                        <span className="user_bio">{userData.bio}</span>
                    </div>
                    <div className="user_controls">
                            <Link to="/"><Button onClick={handleLogout} variant="contained" className="user_button" size="small" color="primary">Logout</Button></Link>
                            <Button onClick={handleEdit} variant="contained" className="user_button" size="small" color="primary">Edit</Button>
                    </div>
                </div>
            </div>
            <div className="adds-section">
                <div className="job-section search">
                    <h1 className="job-section-header">Looking for job</h1>
                    <div className="job-card">
                        <div className="job-card-name">Marketing</div>
                        <div className="job-card-second">Loooking for good job</div>
                    </div>
                    <div className="job-card">
                        <div className="job-card-name">Marketing</div>
                        <div className="job-card-second">Loooking for good job</div>
                    </div>
                    <div className="job-card">
                        <div className="job-card-name">Marketing</div>
                        <div className="job-card-second">Loooking for good job</div>
                    </div>
                </div>
                <div className="job-section offer">
                    <h1 className="job-section-header">Offer a job</h1>
                    <div className="job-card">
                        <div className="job-card-name">Marketing</div>
                        <div className="job-card-second">Loooking for good job</div>
                    </div>
                    <div className="job-card">
                        <div className="job-card-name">Marketing</div>
                        <div className="job-card-second">Loooking for good job</div>
                    </div>
                    <div className="job-card">
                        <div className="job-card-name">Marketing</div>
                        <div className="job-card-second">Loooking for good job</div>
                    </div>
                </div>
            </div>
            <Modal isOpen={editState} onRequestClose={()=>setEdit(false)}>
                <HighlightOffIcon className="close_button" onClick={()=>setEdit(false)}></HighlightOffIcon>
                <h2>Redaguoti profilio duomenis</h2>
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
                                    <span>{userData.img}</span>
                                    <Button className="upload-image" variant="contained" color="primary" component="span">
                                        Upload Photo
                                    </Button>
                                </label>
                                <Button type="submit" variant="contained" color="primary">Submit</Button>
                            </div>
                        </form>
                    </div>
            </Modal>
        </div>
        
    )
}

export default UserProfile
