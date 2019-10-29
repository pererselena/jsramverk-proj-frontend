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
            <h2>Sätt in pengar.</h2>
            <Form>
                <label htmlFor="money">Antal:<br />

                    <Field id="money" type="number" name="money"
                        className={errors.money && touched.money ? ' is-invalid' : ''}
                        value={values.money} />
                    <ErrorMessage component="span" className="error" name="money" />
                </label><br />
                <button className="btnPrimary">Sätt in</button>
            </Form>
            {errors.apifault ? <p>{errors.apifault}</p> : null}
        </main>
    )


const AddMoney = withFormik({
    enableReinitialize: true,
    mapPropsToValues({ money }) {
        return {
            money: money || "",
        };
    },

    validationSchema: yup.object().shape({
        money: yup.string().required("Antal är obligatoriskt"),
    }),


    handleSubmit: (values, { setSubmitting, resetForm, setStatus, setErrors, props }) => {
        setTimeout(() => {
            resetForm();
            setSubmitting(false);
            var data = {
                money: values.money,
                user_id: sessionStorage.getItem("userId"),
            };
            var apiURL = "";

            if (process.env.NODE_ENV === "production") {
                apiURL = "https://trade-api.elenaperers.me"
            } else {
                apiURL = "http://localhost:1338"
            }
            fetch(apiURL + "/depot/addmoney", {
                method: 'PUT',
                headers: {
                    'x-access-token': sessionStorage.getItem("token"),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then(function (res) {
                    console.log(res)
                    if (res.status > 300) {
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

export default AddMoney;
