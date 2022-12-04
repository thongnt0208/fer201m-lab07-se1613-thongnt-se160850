import { CardActionArea, Card, CardMedia, CardContent, Typography, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SendIcon from '@mui/icons-material/Send';
import User from "./otherContacts";
import AddUser from "./addNewOtherContact";
import { useDispatch, useSelector } from "react-redux";

export default function Contact(nowUser) {    
    
    const dispatch = useDispatch();
    const form = useRef();

    const formik = useFormik({
        initialValues: {
            name: "",
            avatar: "",
            created_date: "",
        },
        onSubmit: (values) => {
            emailjs.sendForm('service_8mk833q', 'template_gbuspnd', form.current, 'XI3drcv-b1EjzbR25')
                .then((result) => {
                    console.log(result.text);
                    alert("Sent message!");
                }, (error) => {
                    console.log(error.text);
                });

        },

        validationSchema: Yup.object({
            name: Yup.string().required("Required.").min(2, "Must be 2 characters or more"),
        }),
    });

    const currentUser = useSelector((state) => state.account.value)
    // const currentUser = localStorage.getItem('currentUser');
    console.log("currentUser: " + currentUser);

    return (
        <div className="contact-container">
            <div className="badges-container">
                <Button variant="contained" className='back-button'><ArrowBackIcon />&nbsp;<Link to="/">Back</Link></Button>
                <h1>Contact me via: </h1>
                <a href="mailto:trungthongnguyen2002@gmail.com">
                    <Card className='card' sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://i.pinimg.com/originals/0c/c6/b8/0cc6b8b086ba0f9b40759f955ca532a5.gif"
                                alt="email"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Email
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Contact me via emails
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </a>

                <a href="#Call">
                    <Card className='card' sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://i.pinimg.com/originals/fb/2e/3c/fb2e3c79c3b4fd757275ec1bd4ba6aa8.gif"
                                alt="email"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Call
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Contact me via: 0365960823
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </a>

                <a href="https://www.linkedin.com/in/thongnt0208/">
                    <Card className='card' sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://i.pinimg.com/originals/d3/3b/d9/d33bd9baa83a336184055c07dc8ccaa8.gif"
                                alt="email"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    LinkedIn
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Contact me via linkedin.com/in/thongnt0208/
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </a>
            </div>

            <div className="form-container">
                <form ref={form} onSubmit={formik.handleSubmit}>
                    <TextField
                        autoFocus
                        color="success"
                        margin="normal"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.name && (<Typography variant="caption" color="red">{formik.errors.name}</Typography>)}

                    <TextField
                        autoFocus
                        color="success"
                        margin="normal"
                        name="email"
                        label="Email"
                        type="text"
                        fullWidth
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />

                    <TextField
                        autoFocus
                        color="success"
                        margin="normal"
                        name="message"
                        label="Message"
                        type="text"
                        fullWidth
                        value={formik.values.message}
                        onChange={formik.handleChange}
                    />
                    <Button variant="contained" size="small" type='submit' id="button">Send&nbsp;&nbsp;<SendIcon /></Button>
                </form>
            </div>

            <User nowUser={currentUser}></User>
            {currentUser
                ? <AddUser></AddUser>
                : <p></p>}

        </div>
    )
}