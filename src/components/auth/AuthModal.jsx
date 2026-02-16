import { useMemo, useState } from "react"
import Button from "../ui/Button"
import PillButton from "../ui/PillButton"
import Input from "../ui/Input"
import CloseIcon from "../../assets/icons/close.svg?react";
import FreelanceIcon from "../../assets/icons/type-freelance.svg?react";
import SocieteIcon from "../../assets/icons/type-societe.svg?react";
import ComptableIcon from "../../assets/icons/type-comptable.svg?react";

function AuthModal({ isOpen, onClose, onLoginSuccess, onRegisterSuccess, defaultMode= "connexion" }) {
    const [mode, setMode] = useState(defaultMode)
    const [showErrors, setShowErrors] = useState(false)

    const [form, setForm] = useState({
        accountType: "",
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

    function setAccountType(value) {
        setForm(prev => ({ ...prev, accountType: value }));
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
    const accountTypeOk = useMemo(() => form.accountType !== "", [form.accountType]);

    const isValid = useMemo(() => {
        if (mode === "connexion") return emailOk && passwordOk
        return accountTypeOk && emailOk && passwordOk && firstNameOk && lastNameOk && confirmOk
    }, [mode, accountTypeOk, emailOk, passwordOk, firstNameOk, lastNameOk, confirmOk])

    const fieldErrors = useMemo(() => {
        const errors = {}

        if (!emailOk) errors.email = "Adresse email invalide."
        if (!passwordOk) errors.password = "Minimum 8 caractères."

        if (mode === "inscription") {
            if (!firstNameOk) errors.firstName = "Minimum 2 caractères."
            if (!lastNameOk) errors.lastName = "Minimum 2 caractères."
            if (!confirmOk) errors.confirmPassword = "Ne correspond pas au mot de passe."
            if (mode === "inscription" && !accountTypeOk) {
            errors.accountType = "Choisissez un profil (Freelance, Société ou Comptable).";
            }
        }

        return errors
    }, [mode, accountTypeOk, emailOk, passwordOk, firstNameOk, lastNameOk, confirmOk])
    
    function handleSubmit(e) {
        e.preventDefault();
        setShowErrors(true);

        // Si invalide -> focus sur le premier champ en erreur
        if (!isValid) {
            const order =
            mode === "inscription"
                ? ["firstName", "lastName", "email", "password", "confirmPassword"]
                : ["email", "password"];

            const firstInvalid = order.find((k) => fieldErrors[k]);
            if (firstInvalid) {
            const el = document.querySelector(`[name="${firstInvalid}"]`);
            el?.focus();
            }
            return;
        }

        // Si valide 
        if (mode === "connexion") {
            const userData = {
                email: form.email.trim(),
                accountType: "freelance",
                firstName: "Oussama",
                lastName: "Bin Laden",
            };

            onLoginSuccess?.(userData);
            return;
        }

        // mode === "inscription"
        console.log("REGISTER", { form });

        onRegisterSuccess?.({
            accountType: form.accountType,
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            email: form.email.trim(),
        });


        // Après inscription on repasse en mode connexion
        setMode("connexion");
        setShowErrors(false);

        // garder email + noms, mais reset mdp
        setForm((prev) => ({
            ...prev,
            password: "",
            confirmPassword: "",
        }));
    }


    return (
        <div className={`authModal ${isOpen ? "isOpen" : ""} ${mode}`}>
        <button className="closeBtn" onClick={onClose} type="button">
            <CloseIcon className="close-icon" aria-hidden="true" />
        </button>

        <div className="authContent">
            <PillButton variant={mode} onClickFunction={togglePill} />

            <form action="" onSubmit={handleSubmit} autoComplete="off">
            <p className="modalTitle">
                {mode === "connexion" ? "Connectez-vous" : "Inscrivez-vous"}
            </p>

            {mode === "inscription" && (
                <>
                <div className="field">
                  <div className="accountType">
                    <button
                    type="button"
                    className={`typeCard ${form.accountType === "freelance" ? "is-selected" : ""}`}
                    onClick={() => setAccountType("freelance")}
                    aria-pressed={form.accountType === "freelance"}
                    >
                        <FreelanceIcon aria-hidden="true" />
                        <span>Freelance</span>
                    </button>

                    <button
                    type="button"
                    className={`typeCard ${form.accountType === "societe" ? "is-selected" : ""}`}
                    onClick={() => setAccountType("societe")}
                    aria-pressed={form.accountType === "societe"}
                    >
                        <SocieteIcon aria-hidden="true" />
                        <span>Société</span>
                    </button>

                    <button
                    type="button"
                    className={`typeCard ${form.accountType === "comptable" ? "is-selected" : ""}`}
                    onClick={() => setAccountType("comptable")}
                    aria-pressed={form.accountType === "comptable"}
                    >
                        <ComptableIcon aria-hidden="true" />
                        <span>Comptable</span>
                    </button>
                    </div>
                    {showErrors && fieldErrors.accountType && (
                    <p className="fieldError">{fieldErrors.accountType}</p>
                    )}
                </div>
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
                </>
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