import React from 'react';
import {
    withFormik,
    Form,
    Field,
    ErrorMessage
} from 'formik';
import * as yup from 'yup';




const MyFormik = ({
    values,
    errors,
    touched,
}) => (
        <main>
            <h2>Köp produkt.</h2>
            <h3>{values.location.state.productName}</h3>
            <Form>
                <label htmlFor="amount">Antal:<br />

                    <Field id="amount" type="number" name="amount"
                        className={errors.amount && touched.amount ? ' is-invalid' : ''}
                        value={values.amount} />
                    <ErrorMessage component="span" className="error" name="amount" />
                </label><br />
                <p>Pris: {Math.round(values.location.state.price * 100) / 100}</p>
                <button className="btnPrimary">Köp</button>
            </Form>
            {errors.apifault ? <p>{errors.apifault}</p> : null }
        </main>
    )


const Buy = withFormik({
    enableReinitialize: true,
    mapPropsToValues({ amount, location }) {
        return {
            amount: amount || "",
            location: location || ""
        };
    },

    validationSchema: yup.object().shape({
        amount: yup.string().required("Antal är obligatoriskt"),
    }),


    handleSubmit: (values, { setSubmitting, resetForm, setStatus, setErrors, props }) => {
        setTimeout(() => {
            resetForm();
            setSubmitting(false);
            var data = {
                amount: values.amount,
                user_id: sessionStorage.getItem("userId"),
                product_id: values.location.state.productId,
                price: values.location.state.price
            };
            var apiURL = "";

            if (process.env.NODE_ENV === "production") {
                apiURL = "https://trade-api.elenaperers.me"
            } else {
                apiURL = "http://localhost:1337"
            }
            fetch(apiURL + "/depot/buy", {
                method: 'PUT',
                headers: {
                    'x-access-token': sessionStorage.getItem("token"),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then(function (res) {
                    if (res.status > 300)
                    {
                        setErrors({
                            apifault: res.data
                        })
                    } else {
                        props.history.push('/depot')
                    }
            })
        }, 1000);
    }
})(MyFormik);

export default Buy;
