import React from 'react';
import { Box, Button, Dialog, FormHelperText, OutlinedInput, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useFormik } from "formik";
import * as yup from "yup";

const ForgotPassword = ({ open, handleClose, handleSignIn }) => {

    const validationSchema = yup.object({
        email: yup.string().required("Email  is required"),
    });

    const formik = useFormik({
        initialValues: { email: "" },
        validationSchema: validationSchema,
        onSubmit: async (values) => { },
    });

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
                        <Typography variant='h5'>Reset Your Password</Typography>
                        <Grid sx={{ marginTop: "19px" }}>
                            <Typography >Please enter your email address. You will receive a link to create a new password via email.</Typography>
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
                            <Button type='submit' sx={{ width: '100%' }} variant='contained'>Send</Button>
                        </Grid>
                        <Grid sx={{ marginTop: "19px", display: 'flex', justifyContent: 'center' }}>
                            <Typography>Remember your password ? </Typography>
                            <Typography onClick={handleSignIn}><b> Sign in</b></Typography>
                        </Grid>

                    </Paper>
                </Box>
            </Dialog>
        </>
    )
}
export default ForgotPassword;