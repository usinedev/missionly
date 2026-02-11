function PillButton({
    variant,
    onClickFunction
}) {
    return (
        <button className="switchContainer" onClick={onClickFunction} type="button">
            <div className="fakeBtn switchBtn">Se connecter</div>
            <div className="fakeBtn switchBtn">S'inscrire</div>
            <div className={`pillBtn ${variant === "connexion" ? 'connexion' : 'inscription'} switchBtn`} id="pill">{variant === "connexion" ? "Se connecter" : "S'inscrire"}</div>
        </button>
    )
}

export default PillButton