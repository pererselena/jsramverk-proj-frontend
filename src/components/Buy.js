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
            <h3>{values.productName}</h3>
            <Form>
                <label htmlFor="amount">Antal:<br />

                    <Field id="amount" type="number" name="amount"
                        className={errors.amount && touched.amount ? ' is-invalid' : ''}
                        value={values.amount} />
                    <ErrorMessage component="span" className="error" name="amount" />
                </label><br />
                <button className="btnPrimary">Köp</button>
            </Form>
            <p>Pris: {values.price}</p>
        </main>
    )


const Buy = withFormik({
    enableReinitialize: true,
    mapPropsToValues({ amount, productId, productName, price }) {
        return {
            amount: amount || "",
            productId: productId || "",
            productName: productName || "",
            price: price || ""
        };
    },

    validationSchema: yup.object().shape({
        amount: yup.string().required("Antal är obligatoriskt"),
    }),


    handleSubmit: (values, { setSubmitting, resetForm, setStatus, props }) => {
        setTimeout(() => {
            resetForm();
            setSubmitting(false);
            var data = {
                amount: values.amount,
                user_id: sessionStorage.getItem("userId"),
                product_id: props.productId
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
            })
            setStatus({
                redirectTo: true
            });
            props.callbackFromParent(true)
        }, 1000);
    }
})(MyFormik);

export default Buy;
