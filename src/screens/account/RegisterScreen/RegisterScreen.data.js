import * as Yup from "yup";

export const initialValues = {
  email: "",
  password: "",
  repeatPassword: "",
};

export const validationSchema = Yup.object({
  email: Yup.string().email("Email inválido").required("El email es obligatorio"),
  password: Yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required("La contraseña es obligatoria"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
    .required("Es necesario confirmar la contraseña"),
});
