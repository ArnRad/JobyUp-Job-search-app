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
    const [userJobSearchData, setUserJobSearchData] = useState([]);
    const [userEmployeeSearchData, setUserEmployeeSearchData] = useState([]);
    const [editState, setEdit] = useState(false);
    const [addJobState, setAddJobState] = useState(false);
    const [addEmployeeState, setAddEmployeeState] = useState(false);
    const [editJobState, setEditJobState] = useState(false);
    const [employeeImage, setEmployeeImage] = useState(null);
    const [jobImage, setJobImage] = useState(null);
    const [editEmployeeState, setEditEmployeeState] = useState(false);

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [mobile, setMobile] = useState('');
    const [location, setLocation] = useState('');
    const [value, setGender] = useState('female');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState('');

    const [dutiesEmployee, setDutiesEmployee] = useState('');
    const [experienceEmployee, setExperienceEmployee] = useState('');
    const [jobFieldEmployee, setJobFieldEmployee] = useState('');
    const [locationEmployee, setLocationEmployee] = useState('');
    const [positionEmployee, setPositionEmployee] = useState('');
    const [salaryEmployee, setSalaryEmployee] = useState('');
    const [skillsEmployee, setSkillsEmployee] = useState('');
    const [titleEmployee, setTitleEmployee] = useState('');

    const [educationJob, setEducationJob] = useState('');
    const [experienceJob, setExperienceJob] = useState('');
    const [hobbiesJob, setHobbiesJob] = useState('');
    const [jobFieldJob, setJobFieldJob] = useState('');
    const [languagesJob, setLanguagesJob] = useState('');
    const [locationJob, setLocationJob] = useState('');
    const [skillsJob, setSkillsJob] = useState('');
    const [titleJob, setTitleJob] = useState('');
    
    const [adID, setAdID] = useState('');

    const resetInputsEmployee = () => {
        setDutiesEmployee('');
        setExperienceEmployee('');
        setJobFieldEmployee('');
        setLocationEmployee('');
        setPositionEmployee('');
        setSalaryEmployee('');
        setSkillsEmployee('');
        setTitleEmployee('');
        setAdID('');
        setImageName('');
    }

    
    const resetInputsJob = () => {
        setEducationJob('');
        setExperienceJob('');
        setHobbiesJob('');
        setJobFieldJob('');
        setLanguagesJob('');
        setLocationJob('');
        setSkillsJob('');
        setTitleJob('');
        setAdID('');
        setImageName('');
    }

    useEffect(() => {
        fire.firestore().collection("users")
        .where("user_id", "==", userid)
        .get()
        .then(querySnapshot => {
            querySnapshot.docs.map(doc => {setData(doc.data());});
          });
    }, []);

    useEffect(() => {
        fire.firestore().collection("jobSearch")
        .where("user_id", "==", userid)
        .get()
        .then(querySnapshot => {
            querySnapshot.docs.map(doc => {setUserJobSearchData(oldArray => [...oldArray, doc.data()])});
          });
    }, []);

    userEmployeeSearchData.reverse();

    useEffect(() => {
        fire.firestore().collection("employeeSearch")
        .where("user_id", "==", userid)
        .get()
        .then(querySnapshot => {
            querySnapshot.docs.map(doc => {setUserEmployeeSearchData(oldArray => [...oldArray, doc.data()])});
          });
    }, []);

    const handleChange = (event) => {
        setGender(event.target.value);
      };
  
      const handleAddImageChange = (event) => {
          if(event.target.files[0]) {
              setImage(event.target.files[0]);
          }
      };

      const handleJobImageChange = (event) => {
        if(event.target.files[0]) {
            setJobImage(event.target.files[0]);
        }
    };

    const handleEmployeeImageChange = (event) => {
        if(event.target.files[0]) {
            setEmployeeImage(event.target.files[0]);
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
      };

      const handleJobSearchAdd = (event) => {
        setAddJobState(true);
      }

      const handleEmployeeSearchAdd = (event) => {
        setAddEmployeeState(true);
      }

      const handleJobSearchEdit = (index) => {
        setEditJobState(true);
        setEducationJob(userJobSearchData[index].education);
        setExperienceJob(userJobSearchData[index].experience);
        setHobbiesJob(userJobSearchData[index].hobbies);
        setJobFieldJob(userJobSearchData[index].job_field);
        setLanguagesJob(userJobSearchData[index].languages);
        setLocationJob(userJobSearchData[index].location);
        setSkillsJob(userJobSearchData[index].skills);
        setTitleJob(userJobSearchData[index].title);
        setAdID(userJobSearchData[index].ad_id);
        setImageName(userJobSearchData[index].img_name);
        console.log(userJobSearchData[index].img.name);
      }

      const handleEmployeeSearchEdit = (index) => {
        setEditEmployeeState(true);
        setDutiesEmployee(userEmployeeSearchData[index].duties);
        setExperienceEmployee(userEmployeeSearchData[index].experience);
        setJobFieldEmployee(userEmployeeSearchData[index].job_field);
        setLocationEmployee(userEmployeeSearchData[index].location);
        setPositionEmployee(userEmployeeSearchData[index].position);
        setSalaryEmployee(userEmployeeSearchData[index].salary);
        setSkillsEmployee(userEmployeeSearchData[index].skills);
        setTitleEmployee(userEmployeeSearchData[index].title);
        setAdID(userEmployeeSearchData[index].ad_id)
        setImageName(userJobSearchData[index].img_name);
        console.log(userJobSearchData[index].img.name);
      }
      
      const handleSubmit = (event) => {
          event.preventDefault();
          if(image){
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
                          fire.firestore().collection('users')
                          .doc(userid)
                          .update({
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
                              window.location.reload(false);
                          })
                          .catch((error) => {
                              alert(error.message)
                          })
                      })
              }
          )
        } else{
            fire.firestore().collection('users')
            .doc(userid)
            .update({
                name: name,
                surname: surname,
                mobile: mobile,
                location: location,
                gender: value,
                bio: bio,
                user_id: userid,
                email: userData.email,
            })
            .then(() => {
                alert("User Info Submited!")
                window.location.reload(false);
            })
            .catch((error) => {
                alert(error.message)
            })
        }
      };

      const handleEmployeeAddSubmit = (event) => {
        event.preventDefault();
        const crypto = require("crypto");
        const ad_id = crypto.randomBytes(16).toString("hex");
        const uploadTask = fire.storage().ref(`images/${employeeImage.name}`).put(employeeImage);
        uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {
                console.log(error);
            },
            () => {
                fire.storage()
                .ref("images")
                .child(employeeImage.name)
                .getDownloadURL()
                .then(url => {
                    fire.firestore().collection('employeeSearch')
                        .doc(ad_id)
                        .set({
                            duties: dutiesEmployee,
                            experience: experienceEmployee,
                            job_field: jobFieldEmployee,
                            location: locationEmployee,
                            position: positionEmployee,
                            salary: salaryEmployee,
                            skills: skillsEmployee,
                            title: titleEmployee,
                            img_name: employeeImage.name,
                            img: url,
                            user_id: userid,
                            ad_id: ad_id
                        })
                        .then(() => {
                            alert("Employee Search Advertisement Submited!")
                            setTimeout(function(){window.location.reload(false)}, 500);
                        })
                        .catch((error) => {
                            alert(error.message)
                        })
                    })
                }
        )
    };


    const handleJobAddSubmit = (event) => {
        event.preventDefault();
        const crypto = require("crypto");
        const ad_id = crypto.randomBytes(16).toString("hex");
        const uploadTask = fire.storage().ref(`images/${jobImage.name}`).put(jobImage);
        uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {
                console.log(error);
            },
            () => {
                fire.storage()
                .ref("images")
                .child(jobImage.name)
                .getDownloadURL()
                .then(url => {
                    fire.firestore().collection('jobSearch')
                        .doc(ad_id)
                        .set({
                            job_field: jobFieldJob,
                            location: locationJob,
                            education: educationJob,
                            languages: languagesJob,
                            hobbies: hobbiesJob,
                            experience: experienceJob,
                            skills: skillsJob,
                            title: titleJob,
                            img_name: jobImage.name,
                            img: url,
                            user_id: userid,
                            ad_id: ad_id
                        })
                })
            .then(() => {
                alert("Job Search Advertisement Submited!");
                setTimeout(function(){window.location.reload(false)}, 500);
            })
            .catch((error) => {
                alert(error.message)
            })
    });
}

    const handleJobEditSubmit = (event) => {
        event.preventDefault();
        if(jobImage){
            const uploadTask = fire.storage().ref(`images/${jobImage.name}`).put(jobImage);
            uploadTask.on(
                "state_changed",
                snapshot => {},
                error => {
                    console.log(error);
                },
                () => {
                    fire.storage()
                        .ref("images")
                        .child(jobImage.name)
                        .getDownloadURL()
                        .then(url => {
                            fire.firestore().collection('jobSearch')
                            .doc(adID)
                            .update({
                                job_field: jobFieldJob,
                                location: locationJob,
                                education: educationJob,
                                languages: languagesJob,
                                hobbies: hobbiesJob,
                                experience: experienceJob,
                                skills: skillsJob,
                                img_name: jobImage.name,
                                img: url,
                                title: titleJob
                            })
                            .then(() => {
                                alert("Job Search Advertisement Updated!")
                                window.location.reload(false);
                            })
                            .catch((error) => {
                                alert(error.message)
                            })
                        })
                    }
                )
              } else{
                fire.firestore().collection('jobSearch')
                .doc(adID)
                .update({
                    job_field: jobFieldJob,
                    location: locationJob,
                    education: educationJob,
                    languages: languagesJob,
                    hobbies: hobbiesJob,
                    experience: experienceJob,
                    skills: skillsJob,
                    title: titleJob
                })
                .then(() => {
                    alert("Job Search Advertisement Updated!")
                    setTimeout(function(){window.location.reload(false)}, 500);
                })
                .catch((error) => {
                    alert(error.message)
                })
              }
    };

    const handleEmployeeEditSubmit = (event) => {
        event.preventDefault();
        if(employeeImage){
            const uploadTask = fire.storage().ref(`images/${employeeImage.name}`).put(employeeImage);
            uploadTask.on(
                "state_changed",
                snapshot => {},
                error => {
                    console.log(error);
                },
                () => {
                    fire.storage()
                        .ref("images")
                        .child(employeeImage.name)
                        .getDownloadURL()
                        .then(url => {
                            fire.firestore().collection('employeeSearch')
                            .doc(adID)
                            .update({
                                duties: dutiesEmployee,
                                experience: experienceEmployee,
                                job_field: jobFieldEmployee,
                                location: locationEmployee,
                                position: positionEmployee,
                                img: url,
                                img_name: employeeImage.name,
                                salary: salaryEmployee,
                                skills: skillsEmployee,
                                title: titleEmployee,
                            })
                            .then(() => {
                                alert("Employee Search Advertisement Updated!")
                                setTimeout(function(){window.location.reload(false)}, 500);
                            })
                            .catch((error) => {
                                alert(error.message)
                            })
                        })
                    }
                )
              } else{
                fire.firestore().collection('employeeSearch')
                .doc(adID)
                .update({
                    duties: dutiesEmployee,
                    experience: experienceEmployee,
                    job_field: jobFieldEmployee,
                    location: locationEmployee,
                    position: positionEmployee,
                    salary: salaryEmployee,
                    skills: skillsEmployee,
                    title: titleEmployee,
                })
                .then(() => {
                    alert("Employee Search Advertisement Updated!")
                    setTimeout(function(){window.location.reload(false)}, 500);
                })
                .catch((error) => {
                    alert(error.message)
                })
            }
    };

    const handleJobSearchDelete = (index) => {
        if(window.confirm("Are you sure you want to delete this ad?"))
        {
            fire.firestore().collection('jobSearch')
            .doc(userJobSearchData[index].ad_id)
            .delete()
            .then(() => {
                alert("Job Search Advertisement Deleted!")
                window.location.reload(false);
            })
            .catch((error) => {
                alert(error.message)
            })
        }
    };

    const handleEmployeeSearchDelete = (index) => {
        if(window.confirm("Are you sure you want to delete this ad?"))
        {
            fire.firestore().collection('employeeSearch')
            .doc(userEmployeeSearchData[index].ad_id)
            .delete()
            .then(() => {
                alert("Employee Search Advertisement Deleted!")
                window.location.reload(false);
            })
            .catch((error) => {
                alert(error.message)
            })
        }
    };



    return (
        <div>
            <div className="user-profile">
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
                    <h1 className="job-section-header">Job Search</h1>
                    {userJobSearchData.length != 0 ? (
                        <div>
                            <div className="no-ad-section-container">
                                <div className="no-ad-section">
                                    <span><Button onClick={handleJobSearchAdd} variant="contained" className="ad-section-button" size="small" color="primary">Add New Ad</Button></span>
                                </div>
                            </div>  
                        {userJobSearchData.map((job, index) => (
                        <div key={index} className="job-card-container">
                            <div key={index} className="job-card">
                                <div className="job-title">
                                    <div className="job-title-value"> {job.title}</div>
                                </div>
                                <img className="job-image" src={job.img}></img>
                                <div className="job-field">
                                    <div className="job-field-description">Job Field</div>
                                    <div className="job-field-value"> {job.job_field}</div>
                                </div>
                                <div className="job-field">
                                    <div className="job-field-description">Location</div>
                                    <div className="job-field-value"> {job.location}</div>
                                </div>
                                <div className="job-field">
                                    <div className="job-field-description">Education</div>
                                    <div className="job-field-value"> {job.education}</div>
                                </div>
                                <div className="job-field">
                                    <div className="job-field-description">Languages</div>
                                    <div className="job-field-value"> {job.languages}</div>
                                </div>
                                <div className="job-field">
                                    <div className="job-field-description">Hobbies</div>
                                    <div className="job-field-value"> {job.hobbies}</div>
                                </div>
                                <div className="job-field-big">
                                    <div className="job-field-description">Skills</div>
                                    <div className="job-field-value"> {job.skills}</div>
                                </div>
                                <div className="job-field-big">
                                    <div className="job-field-description">Experience</div>
                                    <div className="job-field-value"> {job.experience}</div>
                                </div>
                            </div> 
                            <div className="ad-function-wrap">
                            <span className="ad-functions"><Button onClick={() => handleJobSearchEdit(index)} variant="contained" className="ad-section-button" size="small" color="primary">Edit</Button></span>
                            <span className="ad-functions"><Button onClick={() => handleJobSearchDelete(index)} variant="contained" className="ad-section-button" size="small" color="primary">Delete</Button></span>
                            </div>
                            </div>
                        ))}
                        </div>           
                    ) : (
                        <div className="no-ad-section-container">
                            <div className="no-ad-section">
                                <h3>You have no job ad yet, if you like to add one, press the button</h3>
                                <span><Button onClick={handleJobSearchAdd} variant="contained" className="ad-section-button" size="small" color="primary">Add</Button></span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="job-section offer">
                    <h1 className="job-section-header">Employee Search</h1>
                    {userEmployeeSearchData.length != 0 ? (
                        <div>
                            <div className="no-ad-section-container">
                                <div className="no-ad-section">
                                    <span><Button onClick={handleEmployeeSearchAdd} variant="contained" className="ad-section-button" size="small" color="primary">Add New Ad</Button></span>
                                </div>
                            </div>  
                        {userEmployeeSearchData.map((job, index) => (
                        <div key={index} className="job-card-container">
                            <div key={index} className="job-card">
                                <div className="job-title">
                                    <div className="job-title-value"> {job.title}</div>
                                </div>
                                <img className="job-image" src={job.img}></img>
                                <div className="job-field">
                                    <div className="job-field-description">Job Field</div>
                                    <div className="job-field-value"> {job.job_field}</div>
                                </div>
                                <div className="job-field">
                                    <div className="job-field-description">Location</div>
                                    <div className="job-field-value"> {job.location}</div>
                                </div>
                                <div className="job-field">
                                    <div className="job-field-description">Position</div>
                                    <div className="job-field-value"> {job.position}</div>
                                </div>
                                <div className="job-field">
                                    <div className="job-field-description">Salary</div>
                                    <div className="job-field-value"> {job.salary}</div>
                                </div>
                                <div className="job-field-big">
                                    <div className="job-field-description">Duties</div>
                                    <div className="job-field-value"> {job.duties}</div>
                                </div>
                                <div className="job-field-big">
                                    <div className="job-field-description">Skills</div>
                                    <div className="job-field-value"> {job.skills}</div>
                                </div>
                                <div className="job-field-big">
                                    <div className="job-field-description">Experience</div>
                                    <div className="job-field-value"> {job.experience}</div>
                                </div>
                            </div> 
                            <div className="ad-function-wrap">
                            <span className="ad-functions"><Button onClick={() => handleEmployeeSearchEdit(index)} variant="contained" className="ad-section-button" size="small" color="primary">Edit</Button></span>
                            <span className="ad-functions"><Button onClick={() => handleEmployeeSearchDelete(index)} variant="contained" className="ad-section-button" size="small" color="primary">Delete</Button></span>
                            </div>
                            </div>
                        ))}
                        </div>        
                    ) : (
                        <div className="no-ad-section-container">
                            <div className="no-ad-section">
                                <h3>You have no job ad yet, if you like to add one, press button</h3>
                                <span><Button onClick={handleEmployeeSearchAdd} variant="contained" className="ad-section-button" size="small" color="primary">Add</Button></span>
                            </div>
                        </div>

                    )}
                </div>
            </div>
            <Modal ariaHideApp={false} isOpen={editState} onRequestClose={()=>setEdit(false)}>
                <HighlightOffIcon className="close_button" onClick={()=>setEdit(false)}></HighlightOffIcon>
                <h2 className="modal-title" >Edit your profile info</h2>
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
                                    onChange={handleAddImageChange}
                                />
                                <label className="upload-image-wrap" htmlFor="contained-button-file">
                                    <span>{userData.img_name}</span>
                                    <Button className="upload-image" variant="contained" color="primary" component="span">
                                        Upload Photo
                                    </Button>
                                </label>
                                <Button type="submit" variant="contained" color="primary">Submit</Button>
                            </div>
                        </form>
                    </div>
            </Modal>

            <Modal ariaHideApp={false} isOpen={addJobState} onRequestClose={()=> {setAddJobState(false); resetInputsJob()}}>
                <HighlightOffIcon className="close_button" onClick={()=> {setAddJobState(false); resetInputsJob()}}></HighlightOffIcon>
                <h2 className="modal-title">Add Job Search advertisement</h2>
                <div className="user-form-container">
                        <form className="user-form" onSubmit={handleJobAddSubmit}>
                            <div className="col-container">
                                <TextField label="Title" type="text" required value={titleJob} onChange={(e) => setTitleJob(e.target.value)}/>
                                <TextField label="Job Field" type="text" required value={jobFieldJob} onChange={(e) => setJobFieldJob(e.target.value)}/>
                                <TextField label="Location" type="text" required value={locationJob} onChange={(e) => setLocationJob(e.target.value)}/>
                                <TextField label="Education" type="text" required value={educationJob} onChange={(e) => setEducationJob(e.target.value)}/>
                                <TextField label="Languages" type="text" required value={languagesJob} onChange={(e) => setLanguagesJob(e.target.value)}/>  
                                <TextField label="Hobbies" type="text" required value={hobbiesJob} onChange={(e) => setHobbiesJob(e.target.value)}/> 
                            </div>
                            <div className="col-container">
                                <TextField variant="outlined" label="Experience" multiline rows={5} rowsMax={10} required value={experienceJob} onChange={(e) => setExperienceJob(e.target.value)}/>
                                <TextField variant="outlined" label="Skills" multiline rows={5} rowsMax={10} required value={skillsJob} onChange={(e) => setSkillsJob(e.target.value)}/>
                                <input
                                    className="photo-input"
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    onChange={handleJobImageChange}
                                />
                                <label className="upload-image-wrap" htmlFor="contained-button-file">
                                {jobImage ? (
                                <span>{jobImage.name}</span>
                                ) : (
                                    <span>Upload ad picture</span>
                                )}
                                    <Button className="upload-image" variant="contained" color="primary" component="span">
                                        Upload Photo
                                    </Button>
                                </label>
                            </div>
                            <div className="form-submit-wrap">
                                <Button className="form-submit-button" type="submit" variant="contained" color="primary">Submit</Button>
                            </div>
                        </form>
                    </div>
            </Modal>

            <Modal ariaHideApp={false} isOpen={editJobState} onRequestClose={()=> {setEditJobState(false); resetInputsJob()}}>
                <HighlightOffIcon className="close_button" onClick={()=> {setEditJobState(false); resetInputsJob()}}></HighlightOffIcon>
                <h2 className="modal-title">Edit Job Search Advertisement</h2>
                <div className="user-form-container">
                        <form className="user-form" onSubmit={handleJobEditSubmit}>
                            <div className="col-container">
                                <TextField label="Title" type="text" required value={titleJob} onChange={(e) => setTitleJob(e.target.value)}/>
                                <TextField label="Job Field" type="text" required value={jobFieldJob} onChange={(e) => setJobFieldJob(e.target.value)}/>
                                <TextField label="Location" type="text" required value={locationJob} onChange={(e) => setLocationJob(e.target.value)}/>
                                <TextField label="Education" type="text" required value={educationJob} onChange={(e) => setEducationJob(e.target.value)}/>
                                <TextField label="Languages" type="text" required value={languagesJob} onChange={(e) => setLanguagesJob(e.target.value)}/>  
                                <TextField label="Hobbies" type="text" required value={hobbiesJob} onChange={(e) => setHobbiesJob(e.target.value)}/> 
                            </div>
                            <div className="col-container">
                                <TextField variant="outlined" label="Experience" multiline rows={5} rowsMax={10} required value={experienceJob} onChange={(e) => setExperienceJob(e.target.value)}/>
                                <TextField variant="outlined" label="Skills" multiline rows={5} rowsMax={10} required value={skillsJob} onChange={(e) => setSkillsJob(e.target.value)}/>
                                <input
                                    className="photo-input"
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    onChange={handleJobImageChange}
                                />
                                <label className="upload-image-wrap" htmlFor="contained-button-file">
                                    <span>{imageName}</span>
                                    <Button className="upload-image" variant="contained" color="primary" component="span">
                                        Upload Photo
                                    </Button>
                                </label>
                            </div>
                            <div className="form-submit-wrap">
                                <Button className="form-submit-button" type="submit" variant="contained" color="primary">Submit</Button>
                            </div>
                        </form>
                    </div>
            </Modal>

            <Modal ariaHideApp={false} isOpen={addEmployeeState} onRequestClose={()=>{setAddEmployeeState(false); resetInputsEmployee();}}>
                <HighlightOffIcon className="close_button" onClick={()=>{setAddEmployeeState(false); resetInputsEmployee();}}></HighlightOffIcon>
                <h2 className="modal-title">Add Employee Search Advertisement</h2>
                <div className="user-form-container">
                        <form className="user-form" onSubmit={handleEmployeeAddSubmit}>
                            <div className="col-container">
                                <TextField label="Title" type="text" required value={titleEmployee} onChange={(e) => setTitleEmployee(e.target.value)}/>
                                <TextField label="Position" type="text" required value={positionEmployee} onChange={(e) => setPositionEmployee(e.target.value)}/>
                                <TextField label="Location" type="text" required value={locationEmployee} onChange={(e) => setLocationEmployee(e.target.value)}/>
                                <TextField label="Job Field" type="text" required value={jobFieldEmployee} onChange={(e) => setJobFieldEmployee(e.target.value)}/>
                                <TextField label="Salary" type="text" required value={salaryEmployee} onChange={(e) => setSalaryEmployee(e.target.value)}/>  
                            </div>
                            <div className="col-container">
                                <TextField variant="outlined" label="Duties" multiline rows={5} rowsMax={10} required value={dutiesEmployee} onChange={(e) => setDutiesEmployee(e.target.value)}/>
                                <TextField variant="outlined" label="Required experience" multiline rows={5} rowsMax={10} required value={experienceEmployee} onChange={(e) => setExperienceEmployee(e.target.value)}/>
                                <TextField variant="outlined" label="Required skills" multiline rows={5} rowsMax={10} required value={skillsEmployee} onChange={(e) => setSkillsEmployee(e.target.value)}/>
                                <input
                                    className="photo-input"
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    onChange={handleEmployeeImageChange}
                                />
                                <label className="upload-image-wrap" htmlFor="contained-button-file">
                                {employeeImage ? (
                                <span>{employeeImage.name}</span>
                                ) : (
                                    <span>Upload ad picture</span>
                                )}
                                    <Button className="upload-image" variant="contained" color="primary" component="span">
                                        Upload Photo
                                    </Button>
                                </label>
                            </div>
                            <div className="form-submit-wrap">
                                <Button className="form-submit-button" type="submit" variant="contained" color="primary">Submit</Button>
                            </div>
                        </form>
                    </div>
            </Modal>

            <Modal ariaHideApp={false} isOpen={editEmployeeState} onRequestClose={()=>{setEditEmployeeState(false); resetInputsEmployee();}}>
                <HighlightOffIcon className="close_button" onClick={()=>{setEditEmployeeState(false); resetInputsEmployee();}}></HighlightOffIcon>
                <h2 className="modal-title">Edit Employee Search Advertisement</h2>
                <div className="user-form-container">
                        <form className="user-form" onSubmit={handleEmployeeEditSubmit}>
                            <div className="col-container">
                                <TextField label="Title" type="text" required value={titleEmployee} onChange={(e) => setTitleEmployee(e.target.value)}/>
                                <TextField label="Position" type="text" required value={positionEmployee} onChange={(e) => setPositionEmployee(e.target.value)}/>
                                <TextField label="Location" type="text" required value={locationEmployee} onChange={(e) => setLocationEmployee(e.target.value)}/>
                                <TextField label="Job Field" type="text" required value={jobFieldEmployee} onChange={(e) => setJobFieldEmployee(e.target.value)}/>
                                <TextField label="Salary" type="text" required value={salaryEmployee} onChange={(e) => setSalaryEmployee(e.target.value)}/>  
                            </div>
                            <div className="col-container">
                                <TextField variant="outlined" label="Duties" multiline rows={5} rowsMax={10} required value={dutiesEmployee} onChange={(e) => setDutiesEmployee(e.target.value)}/>
                                <TextField variant="outlined" label="Required experience" multiline rows={5} rowsMax={10} required value={experienceEmployee} onChange={(e) => setExperienceEmployee(e.target.value)}/>
                                <TextField variant="outlined" label="Required skills" multiline rows={5} rowsMax={10} required value={skillsEmployee} onChange={(e) => setSkillsEmployee(e.target.value)}/>
                                <input
                                    className="photo-input"
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    onChange={handleEmployeeImageChange}
                                />
                                <label className="upload-image-wrap" htmlFor="contained-button-file">
                                    <span>{imageName}</span>
                                    <Button className="upload-image" variant="contained" color="primary" component="span">
                                        Upload Photo
                                    </Button>
                                </label>
                            </div>
                            <div className="form-submit-wrap">
                                <Button className="form-submit-button" type="submit" variant="contained" color="primary">Submit</Button>
                            </div>
                        </form>
                    </div>
            </Modal>
        </div>
        
    )
}

export default UserProfile
