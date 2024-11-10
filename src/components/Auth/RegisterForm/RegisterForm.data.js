import * as Yup from "yup";

export const initialValues = {
  email: "",
  password: "",
  repeatPassword: "",
};

export const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("El correo electrónico es obligatorio"),
  password: Yup.string().required("La contraseña es obligatoria").min(6, "La contraseña debe tener al menos 6 caracteres"),
  repeatPassword: Yup.string()
    .required("Repetir contraseña es obligatorio")
    .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir"),
});
