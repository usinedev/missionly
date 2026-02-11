import { useMemo, useState } from "react"
import Button from "../ui/Button"
import PillButton from "../ui/PillButton"
import Input from "../ui/Input"
import CloseIcon from "../../assets/icons/close.svg?react";

function AuthModal() {
    const [mode, setMode] = useState("connexion")
    const [showErrors, setShowErrors] = useState(false)

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    function togglePill() {
        setMode(prev => (prev === "connexion" ? "inscription" : "connexion"))
        // Masquer les erreurs au switch
        setShowErrors(false)
    }

    function handleChange(e) {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    //Vérif form côté front
    const emailOk = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()), [form.email])
    const passwordOk = useMemo(() => form.password.length >= 8, [form.password])
    const firstNameOk = useMemo(() => form.firstName.trim().length >= 2, [form.firstName])
    const lastNameOk = useMemo(() => form.lastName.trim().length >= 2, [form.lastName])
    const confirmOk = useMemo(
        () => form.confirmPassword.length > 0 && form.confirmPassword === form.password,
        [form.confirmPassword, form.password]
    )

    const isValid = useMemo(() => {
        if (mode === "connexion") return emailOk && passwordOk
        return emailOk && passwordOk && firstNameOk && lastNameOk && confirmOk
    }, [mode, emailOk, passwordOk, firstNameOk, lastNameOk, confirmOk])

    const fieldErrors = useMemo(() => {
        const errors = {}

        if (!emailOk) errors.email = "Adresse email invalide."
        if (!passwordOk) errors.password = "Minimum 8 caractères."

        if (mode === "inscription") {
        if (!firstNameOk) errors.firstName = "Minimum 2 caractères."
        if (!lastNameOk) errors.lastName = "Minimum 2 caractères."
        if (!confirmOk) errors.confirmPassword = "Ne correspond pas au mot de passe."
        }

        return errors
    }, [mode, emailOk, passwordOk, firstNameOk, lastNameOk, confirmOk])
    
    function handleSubmit(e) {
        e.preventDefault();
        setShowErrors(true);

        if (isValid) {
            console.log("submit", { mode, form });
            return;
        }

        // focus premier champ invalide
        const order = mode === "inscription"
            ? ["firstName", "lastName", "email", "password", "confirmPassword"]
            : ["email", "password"];

        const firstInvalid = order.find((k) => fieldErrors[k]);
        if (firstInvalid) {
            const el = document.querySelector(`[name="${firstInvalid}"]`);
            el?.focus();
        }
    }

    return (
        <div className="authModal">
        <button className="closeBtn" type="button">
            <CloseIcon className="close-icon" aria-hidden="true" />
        </button>

        <div className="authContent">
            <PillButton variant={mode} onClickFunction={togglePill} />

            <form action="" onSubmit={handleSubmit} autoComplete="off">
            <p className="modalTitle">
                {mode === "connexion" ? "Connectez-vous" : "Inscrivez-vous"}
            </p>

            {mode === "inscription" && (
                <div className="names">
                <div className="field">
                    <Input
                    variant="form"
                    type="text"
                    name="firstName"
                    placeholder="Prénom"
                    value={form.firstName}
                    onChange={handleChange}
                    autoComplete="given-name"
                    />
                    {showErrors && fieldErrors.firstName && (
                    <p className="fieldError">{fieldErrors.firstName}</p>
                    )}
                </div>

                <div className="field">
                    <Input
                    variant="form"
                    type="text"
                    name="lastName"
                    placeholder="Nom"
                    value={form.lastName}
                    onChange={handleChange}
                    autoComplete="family-name"
                    />
                    {showErrors && fieldErrors.lastName && (
                    <p className="fieldError">{fieldErrors.lastName}</p>
                    )}
                </div>
                </div>
            )}

            <div className="field">
                <Input
                variant="form"
                type="email"
                name="email"
                placeholder="Adresse email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                />
                {showErrors && fieldErrors.email && (
                <p className="fieldError">{fieldErrors.email}</p>
                )}
            </div>

            <div className="field">
                <Input
                variant="form"
                type="password"
                name="password"
                placeholder="Mot de passe"
                value={form.password}
                onChange={handleChange}
                autoComplete={mode === "connexion" ? "current-password" : "new-password"}
                />
                {showErrors && fieldErrors.password && (
                <p className="fieldError">{fieldErrors.password}</p>
                )}
            </div>

            {mode === "inscription" && (
                <div className="field">
                <Input
                    variant="form"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmer le mot de passe"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                />
                {showErrors && fieldErrors.confirmPassword && (
                    <p className="fieldError">{fieldErrors.confirmPassword}</p>
                )}
                </div>
            )}

            <Button
            className="authSubmit"
            type="submit"
            variant={isValid ? "primary" : "disabled"}
            >
            {mode === "connexion" ? "Se connecter" : "Créer un compte"}
            </Button>

            {mode === "inscription" && (
                <p className="disclaimer">
                En vous inscrivant, vous acceptez les conditions d’utilisation de Missionly.
                </p>
            )}
            </form>
        </div>
        </div>
    )
}

export default AuthModal