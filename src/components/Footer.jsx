import { elemClasses } from '../utils/constans';

const { footer, footerCopyright } = elemClasses;

export default function Footer() {
  let currentYear = new Date().getFullYear();
  return (
    <footer className={footer}>
      <p className={footerCopyright}>© {currentYear} Mesto Russia</p>
    </footer>
  );
}
