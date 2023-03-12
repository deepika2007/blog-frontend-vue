import React from 'react';
import { Box, Button, Dialog, FormHelperText, OutlinedInput, Paper, Typography ,Checkbox} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useFormik } from "formik";
import * as yup from "yup";

const Signin = ({ open, handleClose, handleSignUp ,handleForgot}) => {

    const validationSchema = yup.object({
        email: yup.string().required("Email  is required"),
        password: yup.string().required("Password is required"),
    });

    const formik = useFormik({
        initialValues: { email: "", password: '' },
        validationSchema: validationSchema,
        onSubmit: async (values) => { },
    });

    const handleTerms = (e) => { }
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
                        <Typography variant='h5'>Login</Typography>
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
                        <Grid sx={{ marginTop: "19px", display: 'flex', justifyContent: 'space-between' }}>
                            <Grid sx={{ display: 'flex' }}>
                                <Checkbox className="term-b" sx={{
                                    p: 0,
                                    '& .MuiSvgIcon-root': {
                                        // fontSize: 10,
                                        borderRadius: 20
                                    }
                                }} name='tc' onChange={handleTerms} />
                                <Typography sx={{ marginLeft: '10px' }}>Remember me</Typography>
                            </Grid>
                            <Typography onClick={handleForgot}>Forgot password ?</Typography>
                        </Grid>
                        <Grid sx={{ marginTop: "19px" }}>
                            <Button type='submit' sx={{ width: '100%' }} variant='contained'>Login / Sign in</Button>
                        </Grid>
                        <Grid sx={{ marginTop: "19px", display: 'flex', justifyContent: 'center' }}>
                            <Typography>Don't have an account ?  </Typography>
                            <Typography onClick={handleSignUp}><b> Sign up</b></Typography>
                        </Grid>

                    </Paper>
                </Box>
            </Dialog>
        </>
    )
}
export default Signin;