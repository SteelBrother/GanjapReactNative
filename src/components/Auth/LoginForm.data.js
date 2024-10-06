// LoginForm.data.js
import * as Yup from "yup";

export const initialValues = () => ({
  email: '',
  password: ''
});

export const validationSchema = () => {
  return Yup.object().shape({
    email: Yup.string().email("El correo es inválido").required("El correo es requerido"),
    password: Yup.string().required("La contraseña es requerida"),
  });
};
