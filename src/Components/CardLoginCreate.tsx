import styles from './CardLoginCreate.module.css'
import image from "../Assets/image.jpg"
import Logo from './Logo'

function CardLoginCreate() {

  return (
    <div className={styles.container}>
        <Logo/>
        <div className={styles.title}>
            <p>SEU ESPAÇO PESSOAL</p>
            <h2>Tudo começa com você.</h2>
        </div>

        <div className={styles.subtitle}>
            <p>Um lugar simples para cuidar da sua conta.</p>
            <p>seus dados, sempre ao seu alcance.</p>
        </div>

        <div>
            <img src={image} alt="organização" />
        </div>

    </div>
  )
}

export default CardLoginCreate