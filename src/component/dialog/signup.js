import React from 'react';
import { Button, Dialog, FormHelperText, OutlinedInput, Paper, Typography, Box, Checkbox, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useFormik } from "formik";
import * as yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import './index.scss';

const Signup = ({ open, handleClose, handleSignIn }) => {

    const validationSchema = yup.object({
        name: yup.string().required("Name is required"),
        email: yup.string().required("Email  is required"),
        password: yup.string().required("Password is required"),
        tc: yup.string().required("Term and condition is required"),
    });

    const formik = useFormik({
        initialValues: { name: "", email: "", password: '', tc: false },
        validationSchema: validationSchema,
        onSubmit: async (values) => { },
    });

    const handleTerms = (e) => {
        // console.log('yeess', e.target)
        formik.setValues({
            ...formik.values,
            tc: e.target.checked
        })
    }
    // console.log('formik---------->', formik)
    return (
        <>
            <Dialog maxWidth={'lg'}
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <Box component={'form'} noValidate onSubmit={formik?.handleSubmit}>
                    <Paper sx={{ width: '400px', padding: '1.5rem' }}>
                        <Grid className='close_icon_div'>
                            <Typography variant='h5'>Signup</Typography>
                            <IconButton onClick={handleClose}>
                                <CloseIcon sx={{ fontSize: '37px', color: 'black' }} className='close_icon' />
                            </IconButton>
                        </Grid>
                        <Grid sx={{ marginTop: "19px" }}>
                            <Typography >Your Name</Typography>
                            <OutlinedInput
                                placeholder="Ashutosh"
                                value={formik?.values?.name}
                                fullWidth
                                onChange={formik?.handleChange}
                                name="name" sx={{ marginTop: '10px' }}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                            />

                            {formik.errors?.name && (
                                <FormHelperText error={Boolean(formik.errors?.name)}>
                                    {formik.errors?.name}
                                </FormHelperText>
                            )}
                        </Grid>
                        <Grid sx={{ marginTop: "19px" }}>
                            <Typography >Email Address</Typography>
                            <OutlinedInput
                                placeholder="name@example.com"
                                value={formik?.values?.email}
                                fullWidth
                                onChange={formik?.handleChange}
                                name="email" sx={{ marginTop: '10px' }}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                            />

                            {formik.errors?.email && (
                                <FormHelperText error={Boolean(formik.errors?.email)}>
                                    {formik.errors?.email}
                                </FormHelperText>
                            )}
                        </Grid>
                        <Grid sx={{ marginTop: "19px" }}>
                            <Typography >Password</Typography>
                            <OutlinedInput
                                type='password'
                                placeholder="***************"
                                value={formik?.values?.password}
                                fullWidth
                                onChange={formik?.handleChange}
                                name="password" sx={{ marginTop: '10px' }}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                            />

                            {formik.errors?.password && (
                                <FormHelperText error={Boolean(formik.errors?.password)}>
                                    {formik.errors?.password}
                                </FormHelperText>
                            )}
                        </Grid>
                        <Grid sx={{ marginTop: "19px", display: 'flex' }}>
                            <Checkbox className="term-checkbox" sx={{
                                p: 0,
                                '& .MuiSvgIcon-root': {
                                    // fontSize: 20,
                                    borderRadius: 20
                                }
                            }} name='tc' checked={formik?.values?.tc} onChange={handleTerms} />
                            <Typography sx={{ marginLeft: '10px' }}>I Accept Terms And Condition</Typography>

                            {formik.errors?.tc && (
                                <FormHelperText error={Boolean(formik.errors?.tc)}>
                                    {formik.errors?.tc}
                                </FormHelperText>
                            )}
                        </Grid>
                        <Grid sx={{ marginTop: "19px" }}>
                            <Button type='submit' sx={{ width: '100%' }} variant='contained'>Register</Button>
                        </Grid>
                        <Grid sx={{ marginTop: "19px", display: 'flex', justifyContent: 'center' }}>
                            <Typography>Already have an account ? </Typography>
                            <Typography onClick={handleSignIn}><b> Sign in</b></Typography>
                        </Grid>

                    </Paper>
                </Box>
            </Dialog>
        </>
    )
}
export default Signup;