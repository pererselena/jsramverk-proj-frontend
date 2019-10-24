import React, {
    Component
} from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
    withFormik,
    Form,
    Field,
    ErrorMessage
} from 'formik';
import * as yup from 'yup';




class MyFormik extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            redirectTo: false
        };
        this.toggleShow = this.toggleShow.bind(this);
    }

    render() {
        if (this.props.status) {
            const redirectTo = this.props.status.redirectTo;
            if (redirectTo === true) {
                return <Redirect to="/reports/" />;
            }
        }
        return (
            <main>
                <h2>Inloggning</h2>
                <Form>
                    <label htmlFor="emailInput">Email:<br />

                        <Field id="emailInput" type="email" name="email" className={this.props.errors.email && this.props.touched.email ? ' is-invalid' : ''} value={this.props.values.email} />
                        <ErrorMessage component="span" className="error" name="email" />
                    </label><br />
                    <label htmlFor="passwordInput">Lösenord:<br />
                        <Field id="passwordInput" type={this.state.showPassword ? "text" : "password"} className={this.props.errors.password && this.props.touched.password ? ' is-invalid' : ''} name="password" value={this.props.values.password} />
                        <button type="button" className="showPassword" onClick={this.toggleShow}>Visa lösenord</button>
                        <ErrorMessage component="span" className="error" name="password" />
                    </label><br />
                    <Link to="/register"><button className="btnPrimary" type="button">Registrera</button></Link>

                    <button className="btnPrimary">Logga in</button>
                </Form>
            </main>
        );
    }
    toggleShow() {
        this.setState({ showPassword: !this.state.showPassword });
    }
}

const SignIn = withFormik({
    mapPropsToValues({ email, password }) {
        return {
            email: email || "",
            password: password || ""
        };
    },

    validationSchema: yup.object().shape({
        email: yup.string().email("Ogiltig e-post adress").required("E-post adress är obligatoriskt"),
        password: yup.string().min(8, "Lösenordet måste vara minst 8 tecken långt").required("Lösenord är obligatoriskt")
    }),


    // handleSubmit: (values, { setSubmitting, resetForm, setStatus }) => {
    //     setTimeout(() => {
    //         resetForm();
    //         setSubmitting(false);
    //         var data = {
    //             password: values.password,
    //             email: values.email
    //         };
    //         fetch('https://me-api.elenaperers.me/login', {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(data)
    //         })
    //             .then(res => res.json())
    //             .then(function (res) {
    //                 localStorage.setItem("token", res.data.token);
    //             });
    //         setStatus({
    //             redirectTo: true
    //         });
    //     }, 1000);

    // }
})(MyFormik);

export default SignIn;
